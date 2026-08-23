-- ============================================================
-- OWL BUTLER 블로그 · 좋아요 / 익명 댓글 / 조회수
-- Supabase SQL Editor에 이 파일 전체를 붙여넣고 Run 하면 됩니다.
-- 스팸 방지는 의도적으로 넣지 않았습니다 (추후 필요하면 추가).
-- ============================================================

-- 1) 조회수: 글(slug)마다 한 행
create table if not exists page_stats (
  slug text primary key,
  views bigint not null default 0
);

-- 2) 좋아요: 글(slug)마다 한 행에 카운트만 누적 (누가 눌렀는지는 저장 안 함)
create table if not exists likes (
  slug text primary key,
  count bigint not null default 0
);

-- 3) 익명 댓글: 로그인 없이 닉네임 자유 입력
create table if not exists comments (
  id bigint generated always as identity primary key,
  slug text not null,
  name text not null default '익명',
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_slug_idx on comments (slug, created_at desc);

-- RLS 켜기
alter table page_stats enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;

-- 누구나(anon 포함) 읽기 허용
create policy "public read page_stats" on page_stats for select using (true);
create policy "public read likes" on likes for select using (true);
create policy "public read comments" on comments for select using (true);

-- 댓글은 누구나 작성 가능 (익명), 수정/삭제 정책은 없음 = 본인도 못 지움
create policy "public insert comments" on comments for insert with check (true);

-- 조회수/좋아요는 아래 RPC 함수로만 증가시킴 (동시 클릭 시 카운트 꼬임 방지)
create or replace function increment_views(p_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into page_stats (slug, views) values (p_slug, 1)
  on conflict (slug) do update set views = page_stats.views + 1
  returning views into new_count;
  return new_count;
end;
$$;

create or replace function increment_likes(p_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into likes (slug, count) values (p_slug, 1)
  on conflict (slug) do update set count = likes.count + 1
  returning count into new_count;
  return new_count;
end;
$$;

grant execute on function increment_views(text) to anon;
grant execute on function increment_likes(text) to anon;

-- "Automatically expose new tables" 옵션을 꺼둔 프로젝트는 anon 역할에 테이블
-- 기본 권한이 자동으로 부여되지 않으므로, 아래처럼 명시적으로 권한을 줘야 합니다.
grant select, insert on comments to anon;
grant select on likes to anon;
grant select on page_stats to anon;
