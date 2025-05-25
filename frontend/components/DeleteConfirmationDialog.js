import { Trash2, AlertTriangle, X } from "lucide-react";

// Reusable Dialog Component
function DeleteConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Deletion",
	message = "Are you sure you want to delete this item? This action cannot be undone.",
	confirmText = "Delete",
	isDeleting = false,
}) {
	if (!isOpen) return null;

	const handleConfirm = () => {
		onConfirm();
	};

	const handleCancel = () => {
		if (!isDeleting) {
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
				{/* Dialog Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div className="flex items-center gap-3">
						<div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
							<AlertTriangle className="w-5 h-5 text-red-600" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					</div>
					{!isDeleting && (
						<button
							onClick={handleCancel}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<X size={20} />
						</button>
					)}
				</div>

				{/* Dialog Body */}
				<div className="p-6">
					<p className="text-gray-600 mb-4">{message}</p>
					<div className="bg-red-50 border border-red-200 rounded-lg p-3">
						<p className="text-sm text-red-700">
							<strong>Warning:</strong> This is a permanent action.
						</p>
					</div>
				</div>

				{/* Dialog Footer */}
				<div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
					<button
						onClick={handleCancel}
						disabled={isDeleting}
						className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Cancel
					</button>
					<button
						onClick={handleConfirm}
						disabled={isDeleting}
						className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
					>
						{isDeleting ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Deleting...
							</>
						) : (
							<>
								<Trash2 size={16} />
								{confirmText}
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
export default DeleteConfirmationDialog;
