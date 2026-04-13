-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Create a table to store your documents
create table if not exists destinations (
  id text primary key,
  content text, -- The combined search string
  metadata jsonb, -- The original KnowledgeItem (name, category, location, etc)
  embedding vector(384) -- The vector embedding
);

-- Create a function to search for documents
create or replace function match_destinations (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    destinations.id,
    destinations.metadata,
    1 - (destinations.embedding <=> query_embedding) as similarity
  from destinations
  where 1 - (destinations.embedding <=> query_embedding) > match_threshold
  order by destinations.embedding <=> query_embedding
  limit match_count;
end;
$$;
