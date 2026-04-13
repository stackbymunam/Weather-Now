import { memo } from 'react';

const ErrorState = memo(function ErrorState({ message, onRetry }) {
  const isCityNotFound = message === 'CITY_NOT_FOUND';

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      <span className="text-6xl">{isCityNotFound ? '🔍' : '⚡'}</span>
      <h2 className="text-xl font-display font-bold text-white">
        {isCityNotFound ? 'City not found' : 'Something went wrong'}
      </h2>
      <p className="text-muted text-sm text-center max-w-xs">
        {isCityNotFound
          ? 'We couldn\'t find that city. Try a different spelling or a nearby city.'
          : 'We couldn\'t connect to the weather service. Please try again in a few moments.'}
      </p>
      {onRetry && !isCityNotFound && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm rounded-lg transition-colors font-medium"
        >
          Try again
        </button>
      )}
    </div>
  );
});

export default ErrorState;
