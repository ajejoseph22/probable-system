SELECT user_id, sum(usd_amount) as Sum
into #TempSum
from transactions
with (nolock)
group by user_id;


Select TOP 3 u.*
from users u with(nolock)
inner join #TempSum t
on t.user_id = u.id
order by t.Sum desc
