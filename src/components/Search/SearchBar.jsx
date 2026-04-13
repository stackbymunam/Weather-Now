import { memo, useState, useCallback, useRef } from 'react';

const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

const SearchBar = memo(function SearchBar({ onSearch, isLoading }) {
  // City input state is colocated here — no need to lift until submitted
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }, [value, onSearch]);

  const handleClear = useCallback(() => {
    setValue('');
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <SearchIcon />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for a city…"
            className="w-full bg-night-800 border border-white/8 text-white placeholder-muted rounded-xl
              pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-accent-500/50 focus:bg-night-700
              transition-all duration-200"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="px-5 py-3 bg-accent-600 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed
            text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-2
            active:scale-95"
        >
          {isLoading ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
            </svg>
          ) : (
            <SearchIcon />
          )}
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>
    </div>
  );
});

export default SearchBar;
