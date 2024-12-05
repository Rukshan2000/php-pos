document.addEventListener("DOMContentLoaded", function() {
    const suppliersPerPage = 5; // Number of suppliers to show per page
    let currentPage = 1; // Track the current page
    let suppliers = []; // Array to store all suppliers data

    // Function to fetch and display suppliers
    function loadSuppliers() {
        fetch('data/supplier.json')
            .then(response => response.json())
            .then(data => {
                suppliers = data.suppliers; // Get the suppliers from the JSON
                displaySuppliers(); // Display suppliers based on the current page
                updatePagination(); // Update pagination controls
            })
            .catch(error => console.error('Error loading suppliers:', error));
    }

    // Function to display suppliers for the current page
    function displaySuppliers() {
        const supplierTableBody = document.querySelector('#supplierTable tbody');
        
        // Clear existing table data
        supplierTableBody.innerHTML = '';

        // Get the suppliers to show on the current page
        const startIndex = (currentPage - 1) * suppliersPerPage;
        const endIndex = startIndex + suppliersPerPage;
        const suppliersToDisplay = suppliers.slice(startIndex, endIndex);

        // Insert new rows from the supplier data
        suppliersToDisplay.forEach(supplier => {
            const row = document.createElement('tr');

            // Create table cells for each supplier
            row.innerHTML = `
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.email}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.address}</td>
            `;

            // Append the row to the table body
            supplierTableBody.appendChild(row);
        });
    }

    // Function to update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(suppliers.length / suppliersPerPage);
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');
        const currentPageLabel = document.getElementById('currentPage');

        // Disable the "Previous" button if we're on the first page
        prevButton.disabled = currentPage === 1;

        // Disable the "Next" button if we're on the last page
        nextButton.disabled = currentPage === totalPages;

        // Update the current page label
        currentPageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    // Event listener for the "Previous" button
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--; // Go to the previous page
            displaySuppliers(); // Update the table with new page
            updatePagination(); // Update pagination controls
        }
    });

    // Event listener for the "Next" button
    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(suppliers.length / suppliersPerPage);
        if (currentPage < totalPages) {
            currentPage++; // Go to the next page
            displaySuppliers(); // Update the table with new page
            updatePagination(); // Update pagination controls
        }
    });

    // Load suppliers when the page is ready
    loadSuppliers();
});
