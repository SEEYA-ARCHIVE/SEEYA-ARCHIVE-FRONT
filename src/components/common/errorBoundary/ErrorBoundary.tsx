import React from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({ children }: IErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const queryClient = useQueryClient();

  const handleReset = () => {
    reset();
    queryClient.resetQueries();
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      onReset={handleReset}>
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();

  const handleReset = () => {
    resetErrorBoundary();
    router.push('/');
  };

  // TODO: 500 스타일링
  return (
    <div role="alert">
      <button onClick={handleReset}>홈 화면으로 돌아가기</button>
    </div>
  );
}
