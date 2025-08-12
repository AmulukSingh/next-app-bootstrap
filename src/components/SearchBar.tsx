'use client';

import { useState, useEffect, useRef } from 'react';
import { searchAll, SearchResult, getSearchResultIcon, getSearchResultColor } from '@/lib/api/search';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchBarProps {
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
}

export default function SearchBar({ onResultSelect, placeholder = "Search clients, customers, or projects..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const searchResults = await searchAll(query);
        setResults(searchResults);
        setIsOpen(true);
      } catch (err) {
        setError('Search failed. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-lg">🔍</span>
        </div>
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <span className="text-lg">✕</span>
          </button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4 mb-1" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-600">
                {error}
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {query.trim().length < 2 ? 'Type at least 2 characters to search' : 'No results found'}
              </div>
            ) : (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getSearchResultIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs capitalize ${getSearchResultColor(result.type)}`}
                          >
                            {result.type}
                          </Badge>
                          {result.status && (
                            <Badge variant="secondary" className="text-xs">
                              {result.status}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {result.subtitle}
                        </p>
                        {result.description && (
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {result.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
