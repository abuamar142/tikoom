interface AuthErrorAlertProps {
  message: string | null;
}

export function AuthErrorAlert({ message }: AuthErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="p-4 rounded-xl bg-red-50 border border-red-200 animate-fade-in">
      <p className="text-sm font-medium text-red-600">{message}</p>
    </div>
  );
}
