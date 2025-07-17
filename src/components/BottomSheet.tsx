import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimation, type PanInfo } from 'framer-motion'

interface BottomSheetProps {
    children: React.ReactNode
    open: boolean
    onClose: () => void
    snapPoints?: number[]
    className?: string
    initialSnap?: number
}

export default function BottomSheet({ children, open, onClose, snapPoints = [0.4, 0.8], className = '', initialSnap = snapPoints[0] }: BottomSheetProps) {
    const controls = useAnimation()
    const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0)

    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const pixelSnapPoints = snapPoints.map((point) => (1 - point) * windowHeight)
    const initialY = (1 - initialSnap) * windowHeight

    useEffect(() => {
        if (open) {
            controls.start({ y: initialY, transition: { type: 'spring', damping: 40, stiffness: 400 } })
        }
    }, [open, initialY, controls])

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const projectedY = info.point.y + info.velocity.y * 0.1

        const closestSnap = pixelSnapPoints.reduce((prev, curr) => (Math.abs(curr - projectedY) < Math.abs(prev - projectedY) ? curr : prev))

        controls.start({ y: closestSnap, transition: { type: 'spring', damping: 40, stiffness: 400 } })
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        onClick={onClose}
                        className="fixed z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />

                    <motion.div
                        className={`fixed left-0 right-0 bottom-0 z-50 w-full bg-white rounded-t-2xl shadow-xl`}
                        style={{ height: `${Math.max(...snapPoints) * 100}vh`, touchAction: 'none' }}
                        drag="y"
                        onDragEnd={onDragEnd}
                        initial={{ y: '100%' }}
                        animate={controls}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 40, stiffness: 400 }}
                        dragConstraints={{ top: 0, bottom: windowHeight }}
                        dragElastic={{ top: 0.2, bottom: 1 }}
                    >
                        <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
                            <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        <div className={className} style={{ maxHeight: `calc(${Math.max(...snapPoints) * 100}vh - 3rem)` }}>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
