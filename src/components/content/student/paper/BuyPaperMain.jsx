import { useEffect, useState } from "react";
import Button from "../../../shared/buttons/Button";
import { useParams } from "react-router-dom";
import paperService from "../../../../services/paper.service";
import {
  CURRENCY,
  PRICE_PER_PAPER,
  PROMOTION_RATE,
} from "../../../../constants/base";
import { loadStripe } from "@stripe/stripe-js";
import pay from "../../../../config/stripe";
import paymentService from "../../../../services/payment.service";

const BuyPaperMain = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingOnline, setLoadingOnline] = useState(false);

  const { paperId } = useParams();

  const { getPaperById } = paperService();
  const { onlinePayment } = paymentService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPaperById(paperId);
      const obj = {
        id: res.data._id,
        name: res.data.longName,
      };
      setCartItems([obj]);
    };

    fetchData();
  }, []);

  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    setLoadingOnline(true);

    try {
      const stripe = await loadStripe(pay.VITE_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) {
        console.log("Stripe failed to load.");
        return;
      }

      const res = await onlinePayment({
        paperId,
        amount: PRICE_PER_PAPER * (1 - PROMOTION_RATE),
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingOnline(false);
    }
  };

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-6 w-[70%]">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <div>
          <div className="flex items-center justify-between py-2 font-medium border-b">
            <div className="flex-1">Paper</div>
            <div className="text-right w-28">Price</div>
            <div className="w-24 text-center">Qty</div>
          </div>
          <div>
            {cartItems.map((item) => (
              <div
                className="flex items-center justify-between py-4 border-b"
                key={item.id}
              >
                <div className="flex-1">{item.name}</div>
                <div className="text-right w-28">
                  {CURRENCY}. {PRICE_PER_PAPER.toFixed(2)}
                </div>
                <div className="w-24 text-center">1</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-7 w-[30%] bg-purple-50 p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <p className="text-sm font-medium text-purple-700">
            {cartItems?.length} items
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between h-10">
            <p>Sub Total</p>
            <p>
              {CURRENCY} {(cartItems?.length * PRICE_PER_PAPER).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between h-10">
            <p>
              Promotional Discount{" "}
              <span className="font-semibold text-purple-500">
                ({PROMOTION_RATE * 100}%)
              </span>
            </p>
            <p className="font-medium text-purple-500">
              - {CURRENCY}{" "}
              {(cartItems?.length * PRICE_PER_PAPER * PROMOTION_RATE).toFixed(
                2
              )}
            </p>
          </div>
          <div className="flex items-center justify-between h-10 mt-3 border-t">
            <p className="font-medium">Total Due</p>
            <p className="font-semibold">
              {CURRENCY}{" "}
              {(
                cartItems?.length *
                PRICE_PER_PAPER *
                (1 - PROMOTION_RATE)
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          label="Checkout"
          className="w-full"
          size="large"
          isLoading={loadingOnline}
          handleBtn={handleOnlinePayment}
        />
      </div>
    </div>
  );
};

export default BuyPaperMain;
