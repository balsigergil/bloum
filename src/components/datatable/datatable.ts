export class DataTable {
  private table: HTMLTableElement;
  private tbody: HTMLTableSectionElement;
  private thead: HTMLTableSectionElement;
  private originalRows: HTMLTableRowElement[] = [];
  private filteredRows: HTMLTableRowElement[] = [];
  private currentPage = 1;
  private rowsPerPage = 10;
  private sortColumn = -1;
  private sortDirection: "asc" | "desc" = "asc";
  private searchTerm = "";
  private wrapper!: HTMLDivElement;
  private controlsWrapper!: HTMLDivElement;
  private paginationWrapper!: HTMLDivElement;

  constructor(selector: string | HTMLTableElement) {
    // Get the table element
    if (typeof selector === "string") {
      const element = document.querySelector(selector);
      if (!element || !(element instanceof HTMLTableElement)) {
        throw new Error(`No table found with selector: ${selector}`);
      }
      this.table = element;
    } else {
      this.table = selector;
    }

    this.tbody = this.table.querySelector("tbody")!;
    this.thead = this.table.querySelector("thead")!;

    if (!this.tbody || !this.thead) {
      throw new Error("Table must have tbody and thead elements");
    }

    // Store original rows
    this.originalRows = Array.from(this.tbody.querySelectorAll("tr"));
    this.filteredRows = [...this.originalRows];

    // Initialize the datatable
    this.init();
  }

  private init(): void {
    // Create wrapper structure
    this.createWrapper();
    this.createControls();
    this.createPagination();

    // Add sorting to headers
    this.initSorting();

    // Initial render
    this.render();
  }

  private createWrapper(): void {
    // Create main wrapper
    this.wrapper = document.createElement("div");
    this.wrapper.className = "datatable-wrapper";

    // Wrap the table
    this.table.parentNode?.insertBefore(this.wrapper, this.table);

    // Create table container with responsive wrapper
    const tableContainer = document.createElement("div");
    tableContainer.className = "datatable-container table-responsive";
    this.wrapper.appendChild(tableContainer);
    tableContainer.appendChild(this.table);
  }

  private createControls(): void {
    // Create controls wrapper
    this.controlsWrapper = document.createElement("div");
    this.controlsWrapper.className = "datatable-controls";

    // Create search input
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "datatable-search";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "input input-sm";
    searchInput.placeholder = "Search...";
    searchInput.addEventListener("input", (e) => {
      this.searchTerm = (e.target as HTMLInputElement).value;
      this.filterData();
      this.currentPage = 1;
      this.render();
    });

    searchWrapper.appendChild(searchInput);

    // Create rows per page selector
    const perPageWrapper = document.createElement("div");
    perPageWrapper.className = "datatable-per-page";

    const perPageLabel = document.createElement("label");
    perPageLabel.textContent = "Show ";

    const perPageSelect = document.createElement("select");
    perPageSelect.className = "input input-sm";
    [10, 25, 50, 100].forEach((value) => {
      const option = document.createElement("option");
      option.value = value.toString();
      option.textContent = value.toString();
      if (value === this.rowsPerPage) {
        option.selected = true;
      }
      perPageSelect.appendChild(option);
    });

    perPageSelect.addEventListener("change", (e) => {
      this.rowsPerPage = parseInt((e.target as HTMLSelectElement).value);
      this.currentPage = 1;
      this.render();
    });

    perPageLabel.appendChild(perPageSelect);
    const entriesText = document.createElement("span");
    entriesText.textContent = " entries";
    perPageLabel.appendChild(entriesText);

    perPageWrapper.appendChild(perPageLabel);

    this.controlsWrapper.appendChild(searchWrapper);
    this.controlsWrapper.appendChild(perPageWrapper);

    this.wrapper.insertBefore(this.controlsWrapper, this.wrapper.firstChild);
  }

  private createPagination(): void {
    this.paginationWrapper = document.createElement("div");
    this.paginationWrapper.className = "datatable-pagination";
    this.wrapper.appendChild(this.paginationWrapper);
  }

  private initSorting(): void {
    const headers = this.thead.querySelectorAll("th");
    headers.forEach((header, index) => {
      // Skip non-sortable columns (e.g., checkbox columns)
      const text = header.textContent?.trim();
      if (!text || header.querySelector('input[type="checkbox"]')) {
        return;
      }

      header.classList.add("datatable-sortable");
      header.addEventListener("click", () => {
        this.sort(index);
      });
    });
  }

  private sort(columnIndex: number): void {
    // Update sort direction
    if (this.sortColumn === columnIndex) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = columnIndex;
      this.sortDirection = "asc";
    }

    // Update header classes
    const headers = this.thead.querySelectorAll("th");
    headers.forEach((header, index) => {
      header.classList.remove("datatable-sort-asc", "datatable-sort-desc");
      if (index === columnIndex) {
        header.classList.add(`datatable-sort-${this.sortDirection}`);
      }
    });

    // Sort the filtered rows
    this.filteredRows.sort((a, b) => {
      const aCell = a.cells[columnIndex];
      const bCell = b.cells[columnIndex];

      if (!aCell || !bCell) return 0;

      const aText = aCell.textContent?.trim() || "";
      const bText = bCell.textContent?.trim() || "";

      // Try to parse as numbers
      const aNum = parseFloat(aText);
      const bNum = parseFloat(bText);

      let comparison = 0;
      if (!isNaN(aNum) && !isNaN(bNum)) {
        comparison = aNum - bNum;
      } else {
        comparison = aText.localeCompare(bText);
      }

      return this.sortDirection === "asc" ? comparison : -comparison;
    });

    this.render();
  }

  private filterData(): void {
    if (!this.searchTerm) {
      this.filteredRows = [...this.originalRows];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredRows = this.originalRows.filter((row) => {
      return Array.from(row.cells).some((cell) => {
        const text = cell.textContent?.toLowerCase() || "";
        return text.includes(searchLower);
      });
    });
  }

  private render(): void {
    // Clear tbody
    this.tbody.innerHTML = "";

    // Calculate pagination
    const totalPages = Math.ceil(this.filteredRows.length / this.rowsPerPage);
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;

    // Add visible rows
    const visibleRows = this.filteredRows.slice(start, end);
    visibleRows.forEach((row) => {
      this.tbody.appendChild(row.cloneNode(true));
    });

    // Update pagination
    this.updatePagination(totalPages);

    // Update info
    this.updateInfo(start, end);
  }

  private updatePagination(totalPages: number): void {
    this.paginationWrapper.innerHTML = "";

    if (totalPages <= 1) return;

    // Create pagination info
    const infoDiv = document.createElement("div");
    infoDiv.className = "datatable-info";
    this.paginationWrapper.appendChild(infoDiv);

    // Create pagination controls
    const paginationDiv = document.createElement("div");
    paginationDiv.className = "pagination";

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.className = "btn btn-sm btn-ghost";
    prevBtn.textContent = "Previous";
    prevBtn.disabled = this.currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render();
      }
    });
    paginationDiv.appendChild(prevBtn);

    // Page numbers
    const pageNumbers = this.getPageNumbers(totalPages);
    pageNumbers.forEach((pageNum) => {
      if (pageNum === "...") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "...";
        paginationDiv.appendChild(ellipsis);
      } else {
        const pageBtn = document.createElement("button");
        pageBtn.className = "btn btn-sm btn-ghost";
        if (pageNum === this.currentPage) {
          pageBtn.classList.add("btn-primary");
        }
        pageBtn.textContent = pageNum.toString();
        pageBtn.addEventListener("click", () => {
          this.currentPage = pageNum as number;
          this.render();
        });
        paginationDiv.appendChild(pageBtn);
      }
    });

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-sm btn-ghost";
    nextBtn.textContent = "Next";
    nextBtn.disabled = this.currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.render();
      }
    });
    paginationDiv.appendChild(nextBtn);

    this.paginationWrapper.appendChild(paginationDiv);
  }

  private getPageNumbers(totalPages: number): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (this.currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }

  private updateInfo(start: number, end: number): void {
    const infoDiv = this.paginationWrapper.querySelector(".datatable-info");
    if (infoDiv) {
      const actualEnd = Math.min(end, this.filteredRows.length);
      infoDiv.textContent = `Showing ${start + 1} to ${actualEnd} of ${this.filteredRows.length} entries`;

      if (this.filteredRows.length !== this.originalRows.length) {
        infoDiv.textContent += ` (filtered from ${this.originalRows.length} total entries)`;
      }
    }
  }

  // Public methods
  public refresh(): void {
    this.originalRows = Array.from(this.tbody.querySelectorAll("tr"));
    this.filteredRows = [...this.originalRows];
    this.filterData();
    this.render();
  }

  public setRowsPerPage(rows: number): void {
    this.rowsPerPage = rows;
    this.currentPage = 1;
    this.render();
  }

  public setSearchTerm(term: string): void {
    this.searchTerm = term;
    const searchInput = this.wrapper.querySelector(
      ".datatable-search input",
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = term;
    }
    this.filterData();
    this.currentPage = 1;
    this.render();
  }

  public destroy(): void {
    // Move table back to original position
    if (this.table.parentNode && this.wrapper.parentNode) {
      this.wrapper.parentNode.insertBefore(this.table, this.wrapper);
      this.wrapper.remove();
    }

    // Remove sort classes and event listeners
    const headers = this.thead.querySelectorAll("th");
    headers.forEach((header) => {
      header.classList.remove(
        "datatable-sortable",
        "datatable-sort-asc",
        "datatable-sort-desc",
      );
    });

    // Restore original rows
    this.tbody.innerHTML = "";
    this.originalRows.forEach((row) => {
      this.tbody.appendChild(row);
    });
  }
}

// Export for use in browser
if (typeof window !== "undefined") {
  (window as any).DataTable = DataTable;
}
