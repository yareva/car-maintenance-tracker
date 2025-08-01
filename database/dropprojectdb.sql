-- Disable foreign key checks to avoid errors
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Notification;
DROP TABLE IF EXISTS Document;
DROP TABLE IF EXISTS RecordPart;
DROP TABLE IF EXISTS Part;
DROP TABLE IF EXISTS MaintenanceSchedule;
DROP TABLE IF EXISTS MaintenanceRecord;
DROP TABLE IF EXISTS MaintenanceType;
DROP TABLE IF EXISTS ServiceProvider;
DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS User;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
