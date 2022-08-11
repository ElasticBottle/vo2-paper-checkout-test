import {
  PaperSDKError,
  PayWithCard,
  PayWithCrypto,
  TransferSuccessResult,
} from "@paperxyz/react-client-sdk";
import { useState } from "react";

export function PayWithCardExample() {
  const [message, setMessage] = useState<string>("");

  const onPayWithCardTransferSuccess = (result: TransferSuccessResult) => {
    setMessage(`Transaction succeeded!`);
  };

  const onPayWithCardError = (error: PaperSDKError) => {
    console.log("error", error);
    setMessage(`Something went wrong! ${JSON.stringify(error, null, 4)}`);
  };

  return (
    <>
      <PayWithCard
        // checkoutId={"5079ac2b-ff06-45ca-ad9f-9b008be207f4"}
        checkoutId={"88d5242f-cca0-4fea-84c2-8cb941d65b37"}
        recipientWalletAddress={"0x768e25b305aF92DC2a610ac9D7a3732D7D049573"}
        quantity={2}
        mintMethod={{
          name: "claimTo",
          args: {
            _to: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 1,
          },
          payment: {
            currency: "USDC",
            value: "0.5  * $QUANTITY",
          },
        }}
        eligibilityMethod={{
          name: "getClaimIneligibilityReason",
          args: {
            _recipient: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 1,
          },
        }}
        emailAddress={"winston@paper.xyz"}
        onTransferSuccess={onPayWithCardTransferSuccess}
        onError={onPayWithCardError}
      />
      {/* <PayWithCard
        checkoutId={"54762a95-76e7-4fc9-83c6-11d9a2c3ebf8"}
        recipientWalletAddress={"0x927a5D4d0e720379ADb53a895f8755D327faF0F5"}
        emailAddress={"winston@paper.xyz"}
        onTransferSuccess={onPayWithCardTransferSuccess}
        onError={onPayWithCardError}
      /> */}
      <PayWithCrypto
        // checkoutId={"5079ac2b-ff06-45ca-ad9f-9b008be207f4"}
        checkoutId={"88d5242f-cca0-4fea-84c2-8cb941d65b37"}
        recipientWalletAddress="0x768e25b305aF92DC2a610ac9D7a3732D7D049573"
        mintMethod={{
          name: "claimTo",
          args: {
            _to: "$WALLET",
            _quantity: "$QUANTITY",
            _tokenId: 1,
          },
          payment: {
            currency: "DERC20",
            value: "0.001 * $QUANTITY",
          },
        }}
        showConnectWalletOptions={false}
        eligibilityMethod={{
          name: "getClaimIneligibilityReason",
          args: {
            _recipient: "$WALLET",
            _quantity: "1",
            _tokenId: "0",
          },
        }}
        onSuccess={({ transactionResponse }) => {
          console.log(
            "transaction success, txHash: ",
            transactionResponse.hash
          );
        }}
        onError={(error) => {
          console.log("error.code", error.code);
        }}
      />

      {message}
    </>
  );
}
