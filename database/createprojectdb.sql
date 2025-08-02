-- Create database
CREATE DATABASE IF NOT EXISTS CarMaintenanceTracker;
USE CarMaintenanceTracker;

-- =========================
-- USERS
-- =========================
CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL
);
CREATE INDEX idx_user_email ON User(Email);

-- =========================
-- VEHICLE
-- =========================
CREATE TABLE Vehicle (
    VehicleID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Make VARCHAR(50) NOT NULL,
    Model VARCHAR(50) NOT NULL,
    Year INT CHECK (Year >= 1900),
    VIN VARCHAR(17) UNIQUE,
    CurrentMileage INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE RESTRICT
);
CREATE INDEX idx_vehicle_userid ON Vehicle(UserID);


-- =========================
-- SERVICE PROVIDER
-- =========================
CREATE TABLE ServiceProvider (
    ProviderID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    Phone VARCHAR(20)
);

-- =========================
-- MAINTENANCE TYPE
-- =========================
CREATE TABLE MaintenanceType (
    TypeID INT AUTO_INCREMENT PRIMARY KEY,
    TypeName VARCHAR(100) NOT NULL,
    Description VARCHAR(255)
);

-- =========================
-- MAINTENANCE RECORD
-- =========================
CREATE TABLE MaintenanceRecord (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    VehicleID INT NOT NULL,
    TypeID INT,
    ProviderID INT,
    ServiceDate DATE NOT NULL,
    Mileage INT,
    Cost DECIMAL(10,2),
    Notes TEXT,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID) ON DELETE CASCADE,
    FOREIGN KEY (TypeID) REFERENCES MaintenanceType(TypeID) ON DELETE SET NULL,
    FOREIGN KEY (ProviderID) REFERENCES ServiceProvider(ProviderID) ON DELETE SET NULL
);

-- MaintenanceRecord: Common lookups by VehicleID, TypeID, ProviderID
CREATE INDEX idx_maintrecord_vehicleid ON MaintenanceRecord(VehicleID);
CREATE INDEX idx_maintrecord_typeid ON MaintenanceRecord(TypeID);
CREATE INDEX idx_maintrecord_providerid ON MaintenanceRecord(ProviderID);


-- =========================
-- PART
-- =========================
CREATE TABLE Part (
    PartID INT AUTO_INCREMENT PRIMARY KEY,
    PartName VARCHAR(100) NOT NULL,
    PartNumber VARCHAR(50),
    Cost DECIMAL(10,2)
);

-- =========================
-- RECORDPART (junction)
-- =========================
CREATE TABLE RecordPart (
    RecordPartID INT AUTO_INCREMENT PRIMARY KEY,
    RecordID INT NOT NULL,
    PartID INT NOT NULL,
    Quantity INT DEFAULT 1,
    FOREIGN KEY (RecordID) REFERENCES MaintenanceRecord(RecordID) ON DELETE CASCADE,
    FOREIGN KEY (PartID) REFERENCES Part(PartID) ON DELETE CASCADE
);

CREATE INDEX idx_recordpart_recordid ON RecordPart(RecordID);
CREATE INDEX idx_recordpart_partid ON RecordPart(PartID);
-- =========================
-- DOCUMENT
-- =========================
CREATE TABLE Document (
    DocumentID INT AUTO_INCREMENT PRIMARY KEY,
    RecordID INT NOT NULL,
    FileName VARCHAR(255),
    FileURL VARCHAR(255),
    FOREIGN KEY (RecordID) REFERENCES MaintenanceRecord(RecordID) ON DELETE CASCADE
);
CREATE INDEX idx_document_recordid ON Document(RecordID);

-- =========================
-- NOTIFICATION
-- =========================
CREATE TABLE Notification (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    RecordID INT,
    Message VARCHAR(255),
    Status ENUM('Unread','Read') DEFAULT 'Unread',
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (RecordID) REFERENCES MaintenanceRecord(RecordID) ON DELETE CASCADE
);

CREATE INDEX idx_notification_userid ON Notification(UserID);
CREATE INDEX idx_notification_recordid ON Notification(RecordID);
-- =========================
-- MAINTENANCE SCHEDULE
-- =========================
CREATE TABLE MaintenanceSchedule (
    ScheduleID INT AUTO_INCREMENT PRIMARY KEY,
    VehicleID INT NOT NULL,
    TypeID INT NOT NULL,
    DueDate DATE,
    DueMileage INT,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID) ON DELETE CASCADE,
    FOREIGN KEY (TypeID) REFERENCES MaintenanceType(TypeID) ON DELETE CASCADE
);
CREATE INDEX idx_schedule_vehicleid ON MaintenanceSchedule(VehicleID);
CREATE INDEX idx_schedule_typeid ON MaintenanceSchedule(TypeID);
-- USERS
INSERT INTO User (FullName, Email, PasswordHash) VALUES
('Dev Ghai', 'dev.ghai@sjsu.edu', 'hashed_pw_1'),
('Yanin Arevalos', 'yanin.arevalos@sjsu.edu', 'hashed_pw_2'),
('Isa Pudiyapura', 'isa.pudiyapura@sjsu.edu', 'hashed_pw_3');

-- VEHICLES
INSERT INTO Vehicle (UserID, Make, Model, Year, VIN, CurrentMileage) VALUES
(1, 'Toyota', '4Runner', 1999, 'JT3HN86R2X0123456', 215000),
(2, 'Honda', 'Civic', 2015, '2HGFB2F50FH123456', 85000),
(3, 'Tesla', 'Model 3', 2022, '5YJ3E1EA5MF123456', 12000);

-- PROVIDERS
INSERT INTO ServiceProvider (Name, Address, Phone) VALUES
('QuickFix Auto Shop', '123 Main St, San Jose, CA', '408-555-1234'),
('Tesla Service Center', '100 Electric Ave, Fremont, CA', '510-555-4321');

-- MAINTENANCE TYPES
INSERT INTO MaintenanceType (TypeName, Description) VALUES
('Oil Change', 'Replace engine oil and filter'),
('Tire Rotation', 'Rotate tires to balance wear'),
('Brake Service', 'Inspect and replace brake pads'),
('Battery Check', 'Check and maintain battery health');

-- MAINTENANCE RECORDS
INSERT INTO MaintenanceRecord (VehicleID, TypeID, ProviderID, ServiceDate, Mileage, Cost, Notes) VALUES
(1, 1, 1, '2025-07-01', 214500, 65.00, 'Oil and filter changed'),
(2, 2, 1, '2025-06-20', 84000, 40.00, 'Rotated all tires'),
(3, 4, 2, '2025-05-10', 11000, 0.00, 'Battery health checked under warranty');

-- PARTS
INSERT INTO Part (PartName, PartNumber, Cost) VALUES
('Oil Filter', 'OF-123', 12.99),
('Synthetic Oil 5W-30', 'OIL-5W30', 30.00),
('Brake Pads', 'BP-456', 45.00);

-- RECORDPARTS
INSERT INTO RecordPart (RecordID, PartID, Quantity) VALUES
(1, 1, 1),
(1, 2, 5);

-- DOCUMENTS
INSERT INTO Document (RecordID, FileName, FileURL) VALUES
(1, 'receipt_oilchange.pdf', '/uploads/receipt1.pdf');

-- NOTIFICATIONS
INSERT INTO Notification (UserID, RecordID, Message, Status) VALUES
(1, 1, 'Your next oil change is due in 3 months', 'Unread');

-- MAINTENANCE SCHEDULES
INSERT INTO MaintenanceSchedule (VehicleID, TypeID, DueDate, DueMileage) VALUES
(1, 1, '2025-10-01', 220000);
