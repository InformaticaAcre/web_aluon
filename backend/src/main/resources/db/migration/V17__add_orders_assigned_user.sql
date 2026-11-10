-- Assign an internal user to an order (nullable, defensive FK)

alter table customer_order
  add column if not exists assigned_user_id uuid null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'customer_order_assigned_user_fk'
  ) then
    alter table customer_order
      add constraint customer_order_assigned_user_fk
      foreign key (assigned_user_id) references app_user(id)
      on delete set null;
  end if;
end $$;

create index if not exists idx_customer_order_assigned_user_id
  on customer_order(assigned_user_id);

