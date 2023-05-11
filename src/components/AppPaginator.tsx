import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import styles from "./AppPaginator.module.css";

interface Paginator {
  totalPages: number;
  activePage: number;
  onChange: (page: number) => void;
}

const AppPaginator: React.FC<Paginator> = ({
  activePage,
  totalPages,
  onChange,
}) => {
  const handleClick = (pageNumber: number) => {
    onChange(pageNumber);
  };

  return (
    <Pagination>
      <PaginationItem disabled={activePage === 1}>
        <PaginationLink previous onClick={() => handleClick(activePage - 1)} />
      </PaginationItem>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationItem key={index} active={index + 1 === activePage}>
          <PaginationLink onClick={() => handleClick(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={activePage === totalPages}>
        <PaginationLink next onClick={() => handleClick(activePage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default AppPaginator;
