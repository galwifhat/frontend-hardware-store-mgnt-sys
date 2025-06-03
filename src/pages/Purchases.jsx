import { useEffect, useState } from "react";

const dummyPurchases = {
  note: "Monthly bulk order",
  total_cost: 15400,
  items: [
    { product_id: 101, quantity_added: 10, unit_cost: 500 },
    { product_id: 102, quantity_added: 8, unit_cost: 700 },
  ],
};

<PurchaseTable purchases={dummyPurchases} />;

const Purchases = () => {
  const [purchases, setPurchases] = useState(null);

  useEffect(() => {
    //on load -> purchases data
    fetch(`${import.meta.env.VITE_API_URL}/purchasedata`)
      .then((response) => response.json())
      .then((data) => {
        setPurchases(data);
      })
      .catch((err) => console.error("Error fetching purchases:", err));
  }, []);

  if (!purchases) return <p>Loading...</p>;

  return <PurchaseTable purchases={purchases} />;
};

export default Purchases;
