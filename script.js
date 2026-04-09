// Hospital Management System JavaScript
let patients = [];
let appointments = [];
let prescriptions = [];
let bills = [];
let inventory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadDashboardData();
    setupEventListeners();
});

// Initialize sample data
function initializeData() {
    // Sample patients
    patients = [
        { id: 'P001', name: 'John Doe', age: 35, gender: 'Male', phone: '555-0101', bloodGroup: 'O+', email: 'john@email.com' },
        { id: 'P002', name: 'Jane Smith', age: 28, gender: 'Female', phone: '555-0102', bloodGroup: 'A+', email: 'jane@email.com' },
        { id: 'P003', name: 'Robert Johnson', age: 45, gender: 'Male', phone: '555-0103', bloodGroup: 'B+', email: 'robert@email.com' },
        { id: 'P004', name: 'Emily Davis', age: 32, gender: 'Female', phone: '555-0104', bloodGroup: 'AB-', email: 'emily@email.com' },
        { id: 'P005', name: 'Michael Wilson', age: 52, gender: 'Male', phone: '555-0105', bloodGroup: 'O-', email: 'michael@email.com' }
    ];

    // Sample appointments
    const today = new Date();
    appointments = [
        { id: 'A001', patientId: 'P001', patientName: 'John Doe', doctor: 'Dr. Smith', date: today.toISOString().split('T')[0], time: '09:00', type: 'consultation', status: 'scheduled' },
        { id: 'A002', patientId: 'P002', patientName: 'Jane Smith', doctor: 'Dr. Johnson', date: today.toISOString().split('T')[0], time: '10:30', type: 'followup', status: 'scheduled' },
        { id: 'A003', patientId: 'P003', patientName: 'Robert Johnson', doctor: 'Dr. Williams', date: today.toISOString().split('T')[0], time: '14:00', type: 'consultation', status: 'completed' },
        { id: 'A004', patientId: 'P004', patientName: 'Emily Davis', doctor: 'Dr. Smith', date: today.toISOString().split('T')[0], time: '15:30', type: 'emergency', status: 'scheduled' }
    ];

    // Sample prescriptions
    prescriptions = [
        { id: 'RX001', patientId: 'P001', patientName: 'John Doe', doctor: 'Dr. Smith', medicines: 'Amoxicillin 500mg', dosage: '2x daily', status: 'pending' },
        { id: 'RX002', patientId: 'P002', patientName: 'Jane Smith', doctor: 'Dr. Johnson', medicines: 'Ibuprofen 400mg', dosage: '3x daily', status: 'filled' },
        { id: 'RX003', patientId: 'P003', patientName: 'Robert Johnson', doctor: 'Dr. Williams', medicines: 'Metformin 500mg', dosage: '2x daily', status: 'pending' }
    ];

    // Sample bills
    bills = [
        { id: 'B001', patientId: 'P001', patientName: 'John Doe', amount: 250.00, date: today.toISOString().split('T')[0], status: 'pending' },
        { id: 'B002', patientId: 'P002', patientName: 'Jane Smith', amount: 180.50, date: today.toISOString().split('T')[0], status: 'paid' },
        { id: 'B003', patientId: 'P003', patientName: 'Robert Johnson', amount: 320.00, date: today.toISOString().split('T')[0], status: 'pending' }
    ];

    // Sample inventory
    inventory = [
        { id: 'INV001', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 150, unitPrice: 15.50, reorderLevel: 50, status: 'in-stock' },
        { id: 'INV002', name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 25, unitPrice: 8.75, reorderLevel: 30, status: 'low-stock' },
        { id: 'INV003', name: 'Metformin 500mg', category: 'Diabetes', stock: 200, unitPrice: 12.00, reorderLevel: 75, status: 'in-stock' },
        { id: 'INV004', name: 'Lisinopril 10mg', category: 'Blood Pressure', stock: 80, unitPrice: 18.25, reorderLevel: 40, status: 'in-stock' },
        { id: 'INV005', name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 15, unitPrice: 5.50, reorderLevel: 25, status: 'low-stock' }
    ];
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

// Setup event listeners
function setupEventListeners() {
    // Patient form submission
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addPatient();
    });

    // Appointment form submission
    document.getElementById('appointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addAppointment();
    });

    // Patient search
    document.getElementById('patientSearch').addEventListener('input', function(e) {
        searchPatients(e.target.value);
    });

    // Medicine search
    document.getElementById('medicineSearch').addEventListener('input', function(e) {
        searchMedicines(e.target.value);
    });
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Load section-specific data
    switch(sectionId) {
        case 'patients':
            loadPatients();
            break;
        case 'appointments':
            loadAppointments();
            break;
        case 'pharmacy':
            loadPharmacy();
            break;
        case 'billing':
            loadBilling();
            break;
        case 'inventory':
            loadInventory();
            break;
        case 'reports':
            loadReports();
            break;
    }
}

// Load dashboard data
function loadDashboardData() {
    // Dashboard data is already displayed in the HTML
    // You can update it dynamically here if needed
}

// Patient Management
function loadPatients() {
    const tbody = document.getElementById('patientsTableBody');
    tbody.innerHTML = '';
    
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-4 py-2">${patient.id}</td>
            <td class="px-4 py-2 font-medium">${patient.name}</td>
            <td class="px-4 py-2">${patient.age}</td>
            <td class="px-4 py-2">${patient.gender}</td>
            <td class="px-4 py-2">${patient.phone}</td>
            <td class="px-4 py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">${patient.bloodGroup}</span></td>
            <td class="px-4 py-2">
                <button onclick="viewPatient('${patient.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editPatient('${patient.id}')" class="text-green-600 hover:text-green-800 mr-2">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePatient('${patient.id}')" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openPatientModal() {
    document.getElementById('patientModal').classList.remove('hidden');
}

function closePatientModal() {
    document.getElementById('patientModal').classList.add('hidden');
    document.getElementById('patientForm').reset();
}

function addPatient() {
    const form = document.getElementById('patientForm');
    const formData = new FormData(form);
    
    const newPatient = {
        id: 'P' + String(patients.length + 1).padStart(3, '0'),
        name: form.elements[0].value,
        age: parseInt(form.elements[1].value),
        gender: form.elements[2].value,
        phone: form.elements[3].value,
        email: form.elements[4].value,
        bloodGroup: form.elements[5].value
    };
    
    patients.push(newPatient);
    loadPatients();
    closePatientModal();
    showNotification('Patient added successfully!', 'success');
}

function searchPatients(query) {
    const rows = document.querySelectorAll('#patientsTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

function viewPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        alert(`Patient Details:\n\nID: ${patient.id}\nName: ${patient.name}\nAge: ${patient.age}\nGender: ${patient.gender}\nPhone: ${patient.phone}\nBlood Group: ${patient.bloodGroup}`);
    }
}

function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        // Populate form with patient data
        const form = document.getElementById('patientForm');
        form.elements[0].value = patient.name;
        form.elements[1].value = patient.age;
        form.elements[2].value = patient.gender.toLowerCase();
        form.elements[3].value = patient.phone;
        form.elements[4].value = patient.email || '';
        form.elements[5].value = patient.bloodGroup;
        
        openPatientModal();
    }
}

function deletePatient(patientId) {
    if (confirm('Are you sure you want to delete this patient?')) {
        patients = patients.filter(p => p.id !== patientId);
        loadPatients();
        showNotification('Patient deleted successfully!', 'success');
    }
}

// Appointment Management
function loadAppointments() {
    const todayContainer = document.getElementById('todayAppointments');
    const upcomingContainer = document.getElementById('upcomingAppointments');
    
    todayContainer.innerHTML = '';
    upcomingContainer.innerHTML = '';
    
    const today = new Date().toISOString().split('T')[0];
    
    appointments.forEach(apt => {
        const appointmentCard = document.createElement('div');
        appointmentCard.className = 'bg-gray-50 p-3 rounded border-l-4 ' + 
            (apt.status === 'completed' ? 'border-green-500' : 'border-blue-500');
        
        appointmentCard.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-medium">${apt.patientName}</p>
                    <p class="text-sm text-gray-600">${apt.doctor}</p>
                    <p class="text-sm text-gray-500">${apt.time} - ${apt.type}</p>
                </div>
                <span class="status-badge status-${apt.status}">${apt.status}</span>
            </div>
        `;
        
        if (apt.date === today) {
            todayContainer.appendChild(appointmentCard);
        } else {
            upcomingContainer.appendChild(appointmentCard);
        }
    });
}

function openAppointmentModal() {
    document.getElementById('appointmentModal').classList.remove('hidden');
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').classList.add('hidden');
    document.getElementById('appointmentForm').reset();
}

function addAppointment() {
    const form = document.getElementById('appointmentForm');
    
    const newAppointment = {
        id: 'A' + String(appointments.length + 1).padStart(3, '0'),
        patientId: form.elements[0].value,
        patientName: form.elements[0].options[form.elements[0].selectedIndex].text,
        doctor: form.elements[1].options[form.elements[1].selectedIndex].text,
        date: form.elements[2].value,
        time: form.elements[3].value,
        type: form.elements[4].value,
        status: 'scheduled'
    };
    
    appointments.push(newAppointment);
    loadAppointments();
    closeAppointmentModal();
    showNotification('Appointment scheduled successfully!', 'success');
}

function filterAppointments() {
    const selectedDate = document.getElementById('appointmentDate').value;
    // Filter logic here
    showNotification(`Filtering appointments for ${selectedDate}`, 'info');
}

// Pharmacy Management
function loadPharmacy() {
    const prescriptionQueue = document.getElementById('prescriptionQueue');
    prescriptionQueue.innerHTML = '';
    
    prescriptions.forEach(rx => {
        const prescriptionCard = document.createElement('div');
        prescriptionCard.className = 'bg-gray-50 p-3 rounded border';
        
        prescriptionCard.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="font-medium">${rx.patientName}</p>
                    <p class="text-sm text-gray-600">${rx.doctor}</p>
                </div>
                <span class="status-badge status-${rx.status}">${rx.status}</span>
            </div>
            <div class="text-sm">
                <p><strong>Medicine:</strong> ${rx.medicines}</p>
                <p><strong>Dosage:</strong> ${rx.dosage}</p>
            </div>
            <div class="mt-2 flex space-x-2">
                ${rx.status === 'pending' ? `
                    <button onclick="fillPrescription('${rx.id}')" class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                        Fill Prescription
                    </button>
                ` : ''}
                <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    View Details
                </button>
            </div>
        `;
        
        prescriptionQueue.appendChild(prescriptionCard);
    });
}

function fillPrescription(prescriptionId) {
    const prescription = prescriptions.find(rx => rx.id === prescriptionId);
    if (prescription) {
        prescription.status = 'filled';
        loadPharmacy();
        showNotification('Prescription filled successfully!', 'success');
    }
}

function searchMedicines(query) {
    const results = document.getElementById('medicineResults');
    results.innerHTML = '';
    
    if (query.length < 2) return;
    
    const matchingMedicines = inventory.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    
    matchingMedicines.forEach(medicine => {
        const medicineCard = document.createElement('div');
        medicineCard.className = 'bg-gray-50 p-3 rounded border';
        
        medicineCard.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-medium">${medicine.name}</p>
                    <p class="text-sm text-gray-600">${medicine.category}</p>
                    <p class="text-sm text-gray-500">Stock: ${medicine.stock} | Price: $${medicine.unitPrice}</p>
                </div>
                <span class="status-badge status-${medicine.status === 'in-stock' ? 'completed' : 'pending'}">
                    ${medicine.status}
                </span>
            </div>
        `;
        
        results.appendChild(medicineCard);
    });
}

// Billing Management
function loadBilling() {
    const tbody = document.getElementById('billingTableBody');
    tbody.innerHTML = '';
    
    bills.forEach(bill => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-4 py-2">${bill.id}</td>
            <td class="px-4 py-2 font-medium">${bill.patientName}</td>
            <td class="px-4 py-2">$${bill.amount.toFixed(2)}</td>
            <td class="px-4 py-2">${bill.date}</td>
            <td class="px-4 py-2">
                <span class="status-badge status-${bill.status === 'paid' ? 'completed' : 'pending'}">
                    ${bill.status}
                </span>
            </td>
            <td class="px-4 py-2">
                <button onclick="viewBill('${bill.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="fas fa-eye"></i>
                </button>
                ${bill.status === 'pending' ? `
                    <button onclick="payBill('${bill.id}')" class="text-green-600 hover:text-green-800">
                        <i class="fas fa-dollar-sign"></i>
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function generateBill() {
    // Generate new bill logic
    showNotification('Bill generation feature coming soon!', 'info');
}

function viewBill(billId) {
    const bill = bills.find(b => b.id === billId);
    if (bill) {
        alert(`Bill Details:\n\nID: ${bill.id}\nPatient: ${bill.patientName}\nAmount: $${bill.amount.toFixed(2)}\nDate: ${bill.date}\nStatus: ${bill.status}`);
    }
}

function payBill(billId) {
    const bill = bills.find(b => b.id === billId);
    if (bill) {
        bill.status = 'paid';
        loadBilling();
        showNotification('Bill paid successfully!', 'success');
    }
}

// Inventory Management
function loadInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = '';
    
    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-4 py-2 font-medium">${item.name}</td>
            <td class="px-4 py-2">${item.category}</td>
            <td class="px-4 py-2">${item.stock}</td>
            <td class="px-4 py-2">$${item.unitPrice.toFixed(2)}</td>
            <td class="px-4 py-2">${item.reorderLevel}</td>
            <td class="px-4 py-2">
                <span class="status-badge status-${item.status === 'in-stock' ? 'completed' : 'pending'}">
                    ${item.status}
                </span>
            </td>
            <td class="px-4 py-2">
                <button onclick="editInventory('${item.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="reorderItem('${item.id}')" class="text-green-600 hover:text-green-800">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addInventoryItem() {
    // Add inventory item logic
    showNotification('Add inventory feature coming soon!', 'info');
}

function editInventory(itemId) {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
        alert(`Edit Inventory Item:\n\nName: ${item.name}\nCategory: ${item.category}\nCurrent Stock: ${item.stock}\nUnit Price: $${item.unitPrice}`);
    }
}

function reorderItem(itemId) {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
        showNotification(`Reorder request sent for ${item.name}`, 'success');
    }
}

// Reports Management
function loadReports() {
    // Reports data is already displayed in the HTML
    // You can update it dynamically here if needed
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logged out successfully!', 'success');
        // Redirect to login page or reload
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + D for dashboard
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        showSection('dashboard');
    }
    // Ctrl + P for patients
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        showSection('patients');
    }
    // Ctrl + A for appointments
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        showSection('appointments');
    }
    // Escape to close modals
    if (e.key === 'Escape') {
        closePatientModal();
        closeAppointmentModal();
    }
});

// CSV Upload Functionality
let selectedCSVFile = null;

// Initialize CSV upload event listeners
document.addEventListener('DOMContentLoaded', function() {
    const csvFileInput = document.getElementById('csvFileInput');
    const csvDropZone = document.getElementById('csvDropZone');
    
    if (csvFileInput) {
        csvFileInput.addEventListener('change', handleCSVFileSelect);
    }
    
    if (csvDropZone) {
        // Drag and drop events
        csvDropZone.addEventListener('dragover', handleDragOver);
        csvDropZone.addEventListener('dragleave', handleDragLeave);
        csvDropZone.addEventListener('drop', handleDrop);
    }
});

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('csvDropZone').classList.add('border-blue-500', 'bg-blue-50');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('csvDropZone').classList.remove('border-blue-500', 'bg-blue-50');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('csvDropZone').classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'text/csv') {
        handleCSVFile(files[0]);
    } else {
        showNotification('Please select a valid CSV file', 'error');
    }
}

function handleCSVFileSelect(e) {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
        handleCSVFile(file);
    } else {
        showNotification('Please select a valid CSV file', 'error');
    }
}

function handleCSVFile(file) {
    selectedCSVFile = file;
    
    // Update file info display
    document.getElementById('csvFileName').textContent = file.name;
    document.getElementById('csvFileSize').textContent = formatFileSize(file.size);
    document.getElementById('csvFileInfo').classList.remove('hidden');
    
    // Enable upload button
    document.getElementById('uploadBtn').disabled = false;
    
    showNotification('CSV file selected successfully', 'success');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function uploadCSV() {
    if (!selectedCSVFile) {
        showNotification('Please select a CSV file first', 'error');
        return;
    }
    
    const reader = new FileReader();
    const statusDiv = document.getElementById('csvUploadStatus');
    
    // Show loading status
    statusDiv.innerHTML = `
        <div class="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded">
            <i class="fas fa-spinner fa-spin mr-2"></i>Processing CSV file...
        </div>
    `;
    statusDiv.classList.remove('hidden');
    
    reader.onload = function(e) {
        try {
            const csvData = parseCSV(e.target.result);
            const importResult = importCSVData(csvData);
            
            if (importResult.success) {
                statusDiv.innerHTML = `
                    <div class="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded">
                        <i class="fas fa-check-circle mr-2"></i>
                        Successfully imported ${importResult.importedCount} drugs to inventory!
                    </div>
                `;
                
                // Refresh inventory display
                loadInventory();
                loadPharmacy();
                
                // Reset form
                resetCSVUpload();
                
                showNotification(`Successfully imported ${importResult.importedCount} drugs!`, 'success');
            } else {
                statusDiv.innerHTML = `
                    <div class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        <i class="fas fa-exclamation-circle mr-2"></i>
                        Error: ${importResult.error}
                    </div>
                `;
            }
        } catch (error) {
            statusDiv.innerHTML = `
                <div class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    Error parsing CSV file: ${error.message}
                </div>
            `;
        }
    };
    
    reader.onerror = function() {
        statusDiv.innerHTML = `
            <div class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                <i class="fas fa-exclamation-circle mr-2"></i>
                Error reading file
            </div>
        `;
    };
    
    reader.readAsText(selectedCSVFile);
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
        throw new Error('CSV file must contain header and at least one data row');
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            data.push(row);
        }
    }
    
    return { headers, data };
}

function importCSVData(csvData) {
    const requiredColumns = ['name', 'category', 'stock', 'unitPrice', 'reorderLevel'];
    
    // Check required columns
    const missingColumns = requiredColumns.filter(col => !csvData.headers.includes(col));
    if (missingColumns.length > 0) {
        return {
            success: false,
            error: `Missing required columns: ${missingColumns.join(', ')}`
        };
    }
    
    let importedCount = 0;
    const errors = [];
    
    csvData.data.forEach((row, index) => {
        try {
            // Validate data
            const name = row.name?.trim();
            const category = row.category?.trim();
            const stock = parseInt(row.stock);
            const unitPrice = parseFloat(row.unitPrice);
            const reorderLevel = parseInt(row.reorderLevel);
            
            if (!name || !category || isNaN(stock) || isNaN(unitPrice) || isNaN(reorderLevel)) {
                errors.push(`Row ${index + 1}: Invalid data format`);
                return;
            }
            
            // Check if item already exists
            const existingItem = inventory.find(item => 
                item.name.toLowerCase() === name.toLowerCase()
            );
            
            if (existingItem) {
                // Update existing item
                existingItem.category = category;
                existingItem.stock = stock;
                existingItem.unitPrice = unitPrice;
                existingItem.reorderLevel = reorderLevel;
                existingItem.status = stock <= reorderLevel ? 'low-stock' : 'in-stock';
            } else {
                // Add new item
                const newItem = {
                    id: 'INV' + String(inventory.length + 1).padStart(3, '0'),
                    name: name,
                    category: category,
                    stock: stock,
                    unitPrice: unitPrice,
                    reorderLevel: reorderLevel,
                    status: stock <= reorderLevel ? 'low-stock' : 'in-stock'
                };
                inventory.push(newItem);
            }
            
            importedCount++;
        } catch (error) {
            errors.push(`Row ${index + 1}: ${error.message}`);
        }
    });
    
    if (errors.length > 0) {
        return {
            success: false,
            error: `Import completed with ${importedCount} successful imports and ${errors.length} errors. First error: ${errors[0]}`
        };
    }
    
    return {
        success: true,
        importedCount: importedCount
    };
}

function resetCSVUpload() {
    selectedCSVFile = null;
    document.getElementById('csvFileInput').value = '';
    document.getElementById('csvFileInfo').classList.add('hidden');
    document.getElementById('uploadBtn').disabled = true;
    
    // Hide status after 5 seconds
    setTimeout(() => {
        document.getElementById('csvUploadStatus').classList.add('hidden');
    }, 5000);
}

function downloadSampleCSV() {
    const sampleCSV = `name,category,stock,unitPrice,reorderLevel
"Amoxicillin 500mg","Antibiotics",150,15.50,50
"Ibuprofen 400mg","Pain Relief",25,8.75,30
"Metformin 500mg","Diabetes",200,12.00,75
"Lisinopril 10mg","Blood Pressure",80,18.25,40
"Paracetamol 500mg","Pain Relief",15,5.50,25`;
    
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_pharmacy_drugs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Sample CSV downloaded successfully', 'success');
}
