class MamoPay {
  consumerUrl: string;

  constructor() {
    this.consumerUrl = encodeURIComponent(window.location.href);
  }

  getDomain(url: string): string | null {
    const parts = url.split("/");
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return parts[0] + "//" + parts[2];
    } else {
      return null;
    }
  }

  addIframeToWebsite(elementID: string, paymentLinkUrl: string): void {
    const element = document.getElementById(elementID);
    if (element === null) {
      console.error(
        `Failed to locate element with ID ${elementID} from the DOM`
      );
      return;
    }

    const iframe = document.createElement("iframe");
    const domainName = this.getDomain(paymentLinkUrl);
    iframe.src = `${paymentLinkUrl}?consumer=${this.consumerUrl}`;
    iframe.setAttribute("crossorigin", "anonymous");
    iframe.setAttribute("id", "iframe-mamo-checkout");
    iframe.setAttribute("allowTransparency", "true");
    iframe.setAttribute("allow", "payment");
    iframe.setAttribute("allowTransparency", "true");
    // iframe.allowTransparency = "true";
    iframe.style.backgroundColor = "transparent";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.zIndex = "99999";
    element.appendChild(iframe);

    iframe.onload = () => {
      window.addEventListener("message", (event: MessageEvent) => {
        const iframe = document.getElementById(
          "iframe-mamo-checkout"
        ) as HTMLIFrameElement;
        if (!iframe || event.origin !== domainName) {
          return;
        }

        const data = event.data;

        if (data === "closeIframe" || data === "checkout-complete") {
          iframe.style.display = "none";
        } else if (data === "connectionEstablished") {
          console.log("connection established");
        } else if (data.type && data.type === "confirmation_required") {
          iframe.style.display = "none";
          window.location.replace(data.payload);
        }
      });
    };
  }
}

export default MamoPay;
/**
 * window.onload = () => {
    const checkoutDiv = document.getElementById("mamo-checkout");
    if (checkoutDiv !== null) {
      const mamoPay = new MamoPay();
      mamoPay.addIframeToWebsite("mamo-checkout", checkoutDiv.getAttribute("data-src") || "");
    }
  };
 */
