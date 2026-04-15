import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/Button";

export default function AppDialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    confirmText = "Save Changes",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    actions
}) {
    const handleConfirm = () => {
        onConfirm?.();
        onOpenChange(false);
    };

    const handleCancel = () => {
        onCancel?.();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            {/* Glass-like overlay is handled by ShadCN + Tailwind backdrop */}
            <DialogContent className="
        sm:max-w-md
        backdrop-blur-xl
        bg-[#fafafa]
        dark:bg-black/40
        border border-white/20
        shadow-2xl
      ">

                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                {/* BODY */}
                <div className="py-4 text-sm">
                    {children}
                </div>

                {/* FOOTER */}
                <DialogFooter className="flex gap-2 justify-end border-t pt-1">
                    {actions?.length ? (
                        actions.map((btn, i) => (
                            <Button
                                key={i}
                                variant={btn.variant || "outline"}
                                size={btn.size || "sm"}
                                onClick={() => {
                                    btn.onClick?.();
                                    onOpenChange(false);
                                }}
                            >
                                {btn.label}
                            </Button>
                        ))
                    ) : (
                        <>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>

                            <Button variant="secondary" onClick={handleConfirm}>
                                {confirmText}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}