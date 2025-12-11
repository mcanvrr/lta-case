import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  itemsPerPage: number;
  totalUsers: number;
}

export function UserPagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  itemsPerPage,
  totalUsers,
}: UserPaginationProps) {
  if (totalUsers === 0) return null;

  return (
    <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-slate-500">
        Toplam {totalUsers} üyenin {startIndex + 1} -{" "}
        {Math.min(startIndex + itemsPerPage, totalUsers)} arası gösteriliyor
      </p>
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-white hover:border-slate-300"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                className={
                  page === currentPage
                    ? "bg-black text-white hover:bg-black/90 border-none"
                    : "hover:bg-white hover:border-slate-300"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-white hover:border-slate-300"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
