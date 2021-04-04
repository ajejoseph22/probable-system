SELECT u.country
FROM transactions t
         INNER JOIN users u ON u.id = t.user_id
GROUP BY u.country
HAVING AVG(t.usd_amount) < 500
