import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const response = await fetch(
    "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
  );
  const data = await response.text();
  const currencies = data
    .trim()
    .split("\n")
    .slice(2)
    .map((line) => {
      const [country, currency, amount, code, rate] = line.split("|");
      return {
        country: country,
        currency: currency,
        amount: parseFloat(amount),
        code: code,
        rate: parseFloat(rate),
      };
    });
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  return res.json(currencies);
}
