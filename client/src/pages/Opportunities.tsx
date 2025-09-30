import { useState, useEffect, useCallback } from 'react';
import { OpportunityCard } from '@/components/OpportunityCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { api } from '../api';
import type { Opportunity } from '../types';
import { useToast } from '@/hooks/use-toast';

export default function Opportunities() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      const data = await api.getOpportunities();
      setOpportunities(data);
      setFilteredOpportunities(data);
      setIsLoading(false);
    };
    fetchOpportunities();
  }, []);

  const filterOpportunities = useCallback(() => {
    setIsFilterLoading(true);
    setShowNoResults(false);
    
    // Add delay to show loading state
    setTimeout(() => {
      let filtered = opportunities;

      if (searchQuery) {
        filtered = filtered.filter(opp =>
          opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      if (selectedDepartment !== 'all') {
        filtered = filtered.filter(opp => opp.department.includes(selectedDepartment));
      }

      if (selectedType !== 'all') {
        filtered = filtered.filter(opp => opp.type === selectedType);
      }

      setFilteredOpportunities(filtered);
      setIsFilterLoading(false);
      
      // Show no results message only after delay
      if (filtered.length === 0) {
        setTimeout(() => setShowNoResults(true), 500);
      }
    }, 800); // 800ms delay to show loading
  }, [searchQuery, selectedDepartment, selectedType, opportunities]);

  useEffect(() => {
    if (opportunities.length > 0) {
      filterOpportunities();
    }
  }, [filterOpportunities]);

  const handleApply = async (opportunityId: string) => {
    try {
      await api.submitApplication(opportunityId, 'student-1');
      toast({
        title: 'Application Submitted!',
        description: 'Your application has been submitted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Application Failed',
        description: 'There was an error submitting your application.',
        variant: 'destructive',
      });
    }
  };

  const departments = ['Computer Science', 'IT', 'Data Science', 'Electronics'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading opportunities..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-opportunities-title">Browse Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          {filteredOpportunities.length} opportunities available
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by company, role, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-opportunities"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            data-testid="button-toggle-filters"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-lg">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger data-testid="select-department">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger data-testid="select-type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedType('all');
                setSearchQuery('');
              }}
              data-testid="button-clear-filters"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {(selectedDepartment !== 'all' || selectedType !== 'all' || searchQuery) && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
            </Badge>
          )}
          {selectedDepartment !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedDepartment}
            </Badge>
          )}
          {selectedType !== 'all' && (
            <Badge variant="secondary" className="gap-1 capitalize">
              {selectedType}
            </Badge>
          )}
        </div>
      )}

      {/* Opportunities Grid */}
      {isFilterLoading ? (
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" text="Filtering opportunities..." />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                matchPercentage={Math.floor(Math.random() * 30) + 70}
                onApply={() => handleApply(opp.id)}
                onViewDetails={() => console.log('View details:', opp.id)}
              />
            ))}
          </div>

          {filteredOpportunities.length === 0 && showNoResults && (
            <div className="text-center py-16 animate-in fade-in-0 duration-500">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No opportunities found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search query
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                  setSelectedType('all');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
