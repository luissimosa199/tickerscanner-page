import { useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Html5QrcodeError, QrcodeResult } from "html5-qrcode/esm/core";

function useScanner(
  onSuccess: (result: QrcodeResult) => void,
  onError: (error: Html5QrcodeError) => void
) {
  const previewRef = useRef<HTMLDivElement>(null);

  const memoizedResultHandler = useRef(onSuccess);
  const memoizedErrorHandler = useRef(onError);

  useEffect(() => {
    memoizedResultHandler.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    memoizedErrorHandler.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!previewRef.current) return;
    const html5QrcodeScanner = new Html5Qrcode(previewRef.current.id);
    const didStart = html5QrcodeScanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 420, height: 192 } },
        (_, { result }) => {
          memoizedResultHandler.current(result);
          html5QrcodeScanner.stop()
        },
        (_, error) => {
          memoizedErrorHandler.current(error);
        }
      )
      .then(() => true);
    return () => {
      didStart
        .then(() => html5QrcodeScanner.stop())
        .catch(() => {
          console.log("Error stopping scanner");
        });
    };
  }, [previewRef, memoizedResultHandler, memoizedErrorHandler]);

  return previewRef;
}

export default useScanner;
