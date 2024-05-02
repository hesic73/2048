/**
 * Copied from https://github.com/mateuszsokola/2048-in-react/blob/master/components/mobile-swiper.tsx
 */

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

export default function MobileSwiper({ children, onSwipe }) {
    const wrapperRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const handleTouchStart = useCallback((e) => {
        if (!wrapperRef.current?.contains(e.target)) {
            return;
        }

        // e.preventDefault();

        setStartX(e.touches[0].clientX);
        setStartY(e.touches[0].clientY);
    }, []);

    const handleTouchEnd = useCallback(
        (e) => {
            if (!wrapperRef.current?.contains(e.target)) {
                return;
            }



            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;


            // If the swipe is too small, don't trigger it
            if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                return;
            }

            // e.preventDefault();

            onSwipe({ deltaX, deltaY });

            setStartX(0);
            setStartY(0);
        },
        [startX, startY, onSwipe],
    );

    useEffect(() => {
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchEnd]);

    return <div ref={wrapperRef}>{children}</div>;
}