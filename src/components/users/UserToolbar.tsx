import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface UserToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCompanies: string[];
  setSelectedCompanies: (
    companies: string[] | ((prev: string[]) => string[])
  ) => void;
  uniqueCompanies: string[];
  filteredUsersCount: number;
  setCurrentPage: (page: number) => void;
}

export function UserToolbar({
  searchQuery,
  setSearchQuery,
  selectedCompanies,
  setSelectedCompanies,
  uniqueCompanies,
  filteredUsersCount,
  setCurrentPage,
}: UserToolbarProps) {
  return (
    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="İsim, e-posta veya kullanıcı adı ile ara..."
          className="pl-9 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-10 border-slate-200 text-slate-600"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtrele
              {selectedCompanies.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 rounded-sm px-1 font-normal"
                >
                  {selectedCompanies.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Şirkete Göre Filtrele</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {uniqueCompanies.map((company) => (
              <DropdownMenuCheckboxItem
                key={company}
                checked={selectedCompanies.includes(company)}
                onCheckedChange={(checked) => {
                  setSelectedCompanies((prev) =>
                    checked
                      ? [...prev, company]
                      : prev.filter((c) => c !== company)
                  );
                  setCurrentPage(1);
                }}
              >
                {company}
              </DropdownMenuCheckboxItem>
            ))}
            {selectedCompanies.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setSelectedCompanies([])}
                  className="justify-center text-center text-sm"
                >
                  Filtreleri Temizle
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 text-slate-600"
          disabled
        >
          {filteredUsersCount} Sonuç
        </Button>
      </div>
    </div>
  );
}
