# Stlink Database Schema - Michael 

## 📋 Table of Contents
1. [Users & Authentication](#users--authentication)
2. [Mining Devices](#mining-devices)
3. [Earnings & Financial](#earnings--financial)

---

## 🏷️ USERS & AUTHENTICATION

✔️  Subject: Users & Roles

🔴 ========== `users`
| Field          | Type         | Null | Key | Default              | Comment                          |
|----------------|--------------|------|-----|----------------------|----------------------------------|
| id             | INT          | NO   | PRI | auto_increment       | Unique user ID                   |
| username       | VARCHAR(255) | NO   | UNI |                      | Unique username for login        |
| email          | VARCHAR(255) | NO   | UNI |                      | User email address               |
| password_hash  | TEXT         | NO   |     |                      | Hashed password for security     |
| phone          | VARCHAR(20)  | YES  |     | NULL                 | Phone number for notifications   |
| first_name     | VARCHAR(100) | YES  |     | NULL                 | User first name                  |
| last_name      | VARCHAR(100) | YES  |     | NULL                 | User last name                   |
| role_id        | INT          | NO   | MUL |                      | Foreign key to roles.id          |
| profile_image_url | VARCHAR(255) | YES |   | NULL                 | URL for profile picture          |
| logo_url       | VARCHAR(255) | YES  |     | NULL                 | URL for user logo                |
| is_active      | BOOLEAN      | NO   |     | TRUE                 | Account status flag              |
| email_verified | BOOLEAN      | NO   |     | FALSE                | Email verification status        |
| phone_verified | BOOLEAN      | NO   |     | FALSE                | Phone verification status        |
| last_login     | DATETIME     | YES  |     | NULL                 | Last login timestamp             |
| created_at     | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Account creation time            |
| updated_at     | DATETIME     | YES  |     | NULL                 | Last profile update time         |

💜 **Relations:**
- `role_id` → `roles(id)`

---

🔴 ========== `roles`
| Field       | Type         | Null | Key | Default              | Comment                          |
|-------------|--------------|------|-----|----------------------|----------------------------------|
| id          | INT          | NO   | PRI | auto_increment       | Unique role identifier           |
| name        | VARCHAR(255) | NO   | UNI |                      | Role name (admin, user, moderator) |
| description | TEXT         | YES  |     | NULL                 | Role description                 |
| level       | INT          | NO   |     | 0                    | Role hierarchy level             |
| is_system   | BOOLEAN      | NO   |     | FALSE                | System role flag                 |
| created_at  | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Creation timestamp               |

---

🔴 ========== `permissions`
| Field       | Type         | Null | Key | Default              | Comment                          |
|-------------|--------------|------|-----|----------------------|----------------------------------|
| id          | INT          | NO   | PRI | auto_increment       | Unique permission ID             |
| name        | VARCHAR(255) | NO   | UNI |                      | Permission name                  |
| description | TEXT         | YES  |     | NULL                 | Permission description           |
| module      | VARCHAR(100) | NO   |     |                      | System module name               |
| action      | VARCHAR(100) | NO   |     |                      | Action type (create, read, update, delete) |
| created_at  | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Creation timestamp               |

---

🔴 ========== `role_permissions`
| Field          | Type | Null | Key | Default              | Comment                          |
|----------------|------|------|-----|----------------------|----------------------------------|
| id             | INT  | NO   | PRI | auto_increment       | Unique mapping ID                |
| role_id        | INT  | NO   | MUL |                      | Foreign key to roles.id          |
| permission_id  | INT  | NO   | MUL |                      | Foreign key to permissions.id    |
| created_at     | DATETIME | NO |   | CURRENT_TIMESTAMP    | Creation timestamp               |

💜 **Relations:**
- `role_id` → `roles(id)`
- `permission_id` → `permissions(id)`
- UNIQUE `unique_role_permission` (`role_id`, `permission_id`)

---

🔴 ========== `user_sessions`
| Field          | Type         | Null | Key | Default              | Comment                          |
|----------------|--------------|------|-----|----------------------|----------------------------------|
| id             | INT          | NO   | PRI | auto_increment       | Unique session ID                |
| user_id        | INT          | NO   | MUL |                      | Foreign key to users.id          |
| token          | VARCHAR(255) | NO   | UNI |                      | JWT authentication token         |
| ip_address     | VARCHAR(45)  | YES  |     | NULL                 | Client IP address                |
| user_agent     | TEXT         | YES  |     | NULL                 | Browser/device information       |
| expires_at     | DATETIME     | NO   |     |                      | Token expiration time            |
| is_active      | BOOLEAN      | NO   |     | TRUE                 | Session status                   |
| created_at     | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Session creation time            |

💜 **Relations:**
- `user_id` → `users(id)`

---

## ⚙️ MINING DEVICES

✔️  Subject: Mining Hardware & Devices

🔴 ========== `mining_devices`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique device ID                 |
| user_id             | INT          | NO   | MUL |                      | Foreign key to users.id          |
| device_name         | VARCHAR(255) | NO   |     |                      | Device display name              |
| imei                | VARCHAR(15)  | NO   | UNI |                      | Device IMEI number               |
| device_model        | VARCHAR(100) | NO   |     |                      | Device model/type                |
| serial_number       | VARCHAR(100) | YES  | UNI | NULL                 | Device serial number             |
| start_date          | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Device operation start date      |
| total_uptime_seconds| BIGINT       | NO   |     | 0                    | **CALCULATED** Total operational time |
| total_revenue       | DECIMAL(15,8)| NO   |     | 0.00000000           | **CALCULATED** Total device revenue |
| status              | ENUM('active','inactive','maintenance','offline','error') | NO | 'active' | Device status |
| ip_address          | VARCHAR(45)  | YES  |     | NULL                 | Device IP address                |
| firmware_version    | VARCHAR(50)  | YES  |     | NULL                 | Current firmware version         |
| location            | VARCHAR(255) | YES  |     | NULL                 | Physical device location         |
| created_at          | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Device registration date         |
| updated_at          | DATETIME     | YES  |     | NULL                 | Last update timestamp            |

💜 **Relations:**
- `user_id` → `users(id)`

---

🔴 ========== `device_specifications`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique spec ID                   |
| device_id           | INT          | NO   | MUL |                      | Foreign key to mining_devices.id |
| processor_type      | VARCHAR(100) | YES  |     | NULL                 | CPU/GPU/ASIC type                |
| processor_speed     | DECIMAL(8,2) | YES  |     | NULL                 | Processing speed in MH/s/GH/s    |
| memory_size         | INT          | YES  |     | NULL                 | RAM size in GB                   |
| memory_type         | VARCHAR(50)  | YES  |     | NULL                 | RAM type                         |
| storage_size        | INT          | YES  |     | NULL                 | Storage size in GB               |
| power_consumption   | DECIMAL(8,2) | YES  |     | NULL                 | Power usage in watts             |
| fan_count           | INT          | YES  |     | NULL                 | Number of cooling fans           |
| hash_rate           | DECIMAL(12,4)| YES  |     | NULL                 | Current hash rate                |
| algorithm           | VARCHAR(100) | YES  |     | NULL                 | Mining algorithm                 |
| created_at          | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Specification creation date      |

💜 **Relations:**
- `device_id` → `mining_devices(id)`

---

🔴 ========== `device_metrics`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique metric ID                 |
| device_id           | INT          | NO   | MUL |                      | Foreign key to mining_devices.id |
| cpu_usage           | DECIMAL(5,2) | NO   |     | 0.00                 | CPU usage percentage             |
| memory_usage        | DECIMAL(5,2) | NO   |     | 0.00                 | Memory usage percentage          |
| gpu_usage           | DECIMAL(5,2) | YES  |     | 0.00                 | GPU usage percentage             |
| processing_speed    | DECIMAL(10,2)| NO   |     | 0.00                 | Current processing speed         |
| fan_speed_rpm       | INT          | NO   |     | 0                    | Fan speed in RPM                 |
| temperature         | DECIMAL(5,2) | NO   |     | 0.00                 | Device temperature in Celsius    |
| power_consumption   | DECIMAL(8,2) | NO   |     | 0.00                 | Current power consumption        |
| hash_rate           | DECIMAL(12,4)| NO   |     | 0.0000               | Current hash rate                |
| network_latency     | DECIMAL(8,4) | YES  |     | NULL                 | Network latency in ms            |
| recorded_at         | DATETIME     | NO   | MUL | CURRENT_TIMESTAMP    | Metric recording timestamp       |

💜 **Relations:**
- `device_id` → `mining_devices(id)`

---

🔴 ========== `mining_sessions`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique session ID                |
| device_id           | INT          | NO   | MUL |                      | Foreign key to mining_devices.id |
| session_start       | DATETIME     | NO   | MUL | CURRENT_TIMESTAMP    | Session start time               |
| session_end         | DATETIME     | YES  |     | NULL                 | Session end time                 |
| duration_seconds    | INT          | NO   |     | 0                    | Session duration in seconds      |
| earnings            | DECIMAL(15,8)| NO   |     | 0.00000000           | Earnings from this session       |
| status              | ENUM('running','completed','interrupted','failed') | NO | 'running' | Session status |
| avg_hash_rate       | DECIMAL(12,4)| YES  |     | NULL                 | Average hash rate during session |
| energy_consumed     | DECIMAL(10,4)| YES  |     | NULL                 | Energy consumed in kWh           |
| created_at          | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Session creation date            |

💜 **Relations:**
- `device_id` → `mining_devices(id)`

---

## 💰 EARNINGS & FINANCIAL

✔️  Subject: Earnings & Financial Management

🔴 ========== `device_earnings`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique earning ID                |
| device_id           | INT          | NO   | MUL |                      | Foreign key to mining_devices.id |
| mining_session_id   | INT          | YES  | MUL | NULL                 | Foreign key to mining_sessions.id|
| amount              | DECIMAL(15,8)| NO   |     | 0.00000000           | Earning amount                   |
| currency            | VARCHAR(10)  | NO   |     | 'BTC'                | Currency code                    |
| earning_date        | DATETIME     | NO   | MUL | CURRENT_TIMESTAMP    | Date of earning                  |
| calculated_at       | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | When earning was calculated      |
| is_settled          | BOOLEAN      | NO   |     | FALSE                | If earning has been settled      |
| transaction_hash    | VARCHAR(255) | YES  | UNI | NULL                 | Blockchain transaction hash      |
| exchange_rate       | DECIMAL(15,8)| YES  |     | NULL                 | Exchange rate at time of earning |

💜 **Relations:**
- `device_id` → `mining_devices(id)`
- `mining_session_id` → `mining_sessions(id)`

---

🔴 ========== `mining_wallets`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique wallet ID                 |
| user_id             | INT          | NO   | MUL |                      | Foreign key to users.id          |
| total_earnings      | DECIMAL(15,8)| NO   |     | 0.00000000           | **CALCULATED** Total lifetime earnings |
| withdrawn_amount    | DECIMAL(15,8)| NO   |     | 0.00000000           | **CALCULATED** Total withdrawn amount |
| available_balance   | DECIMAL(15,8)| NO   |     | 0.00000000           | **CALCULATED** Current available balance |
| pending_balance     | DECIMAL(15,8)| NO   |     | 0.00000000           | **CALCULATED** Pending/unconfirmed balance |
| currency            | VARCHAR(10)  | NO   |     | 'BTC'                | Primary currency                 |
| wallet_address      | VARCHAR(255) | YES  | UNI | NULL                 | Crypto wallet address            |
| last_updated        | DATETIME     | NO   |     | CURRENT_TIMESTAMP    | Last balance update time         |

💜 **Relations:**
- `user_id` → `users(id)`
- UNIQUE `unique_user_currency` (`user_id`, `currency`)

---

🔴 ========== `withdrawal_requests`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique withdrawal ID             |
| user_id             | INT          | NO   | MUL |                      | Foreign key to users.id          |
| amount              | DECIMAL(15,8)| NO   |     |                      | Withdrawal amount                |
| currency            | VARCHAR(10)  | NO   |     | 'BTC'                | Currency code                    |
| wallet_address      | VARCHAR(255) | NO   |     |                      | Destination wallet address       |
| transaction_hash    | VARCHAR(255) | YES  | UNI | NULL                 | Blockchain transaction hash      |
| status              | ENUM('pending','processing','completed','failed','cancelled') | NO | 'pending' | Withdrawal status |
| network_fee         | DECIMAL(15,8)| YES  |     | 0.00000000           | Network transaction fee          |
| service_fee         | DECIMAL(15,8)| YES  |     | 0.00000000           | Service fee amount               |
| requested_at        | DATETIME     | NO   | MUL | CURRENT_TIMESTAMP    | Request creation time            |
| processed_at        | DATETIME     | YES  |     | NULL                 | When withdrawal was processed    |
| processed_by        | INT          | YES  | MUL | NULL                 | Foreign key to users.id (admin)  |

💜 **Relations:**
- `user_id` → `users(id)`
- `processed_by` → `users(id)`

---

🔴 ========== `device_alerts`
| Field               | Type         | Null | Key | Default              | Comment                          |
|---------------------|--------------|------|-----|----------------------|----------------------------------|
| id                  | INT          | NO   | PRI | auto_increment       | Unique alert ID                  |
| device_id           | INT          | NO   | MUL |                      | Foreign key to mining_devices.id |
| alert_type          | ENUM('high_temperature','low_hash_rate','offline','high_power','fan_failure','maintenance_required','error') | NO |  | Alert category |
| alert_message       | TEXT         | NO   |     |                      | Detailed alert message           |
| severity            | ENUM('low','medium','high','critical') | NO | 'medium' | Alert severity level |
| is_resolved         | BOOLEAN      | NO   |     | FALSE                | If alert has been resolved       |
| resolved_at         | DATETIME     | YES  |     | NULL                 | When alert was resolved          |
| resolved_by         | INT          | YES  | MUL | NULL                 | Foreign key to users.id (who resolved) |
| created_at          | DATETIME     | NO   | MUL | CURRENT_TIMESTAMP    | Alert creation time              |

💜 **Relations:**
- `device_id` → `mining_devices(id)`
- `resolved_by` → `users(id)`

---

### 💜 **Key Relationships Summary**
| From Table | To Table | Foreign Key | Relation Type | Description |
|------------|----------|-------------|---------------|-------------|
| users.role_id | roles | id | Many-to-One | User role assignment |
| role_permissions.role_id | roles | id | Many-to-Many | Role permissions mapping |
| role_permissions.permission_id | permissions | id | Many-to-Many | Permission assignments |
| user_sessions.user_id | users | id | Many-to-One | User session tracking |
| mining_devices.user_id | users | id | Many-to-One | Device ownership |
| device_specifications.device_id | mining_devices | id | One-to-One | Device specifications |
| device_metrics.device_id | mining_devices | id | Many-to-One | Performance metrics |
| mining_sessions.device_id | mining_devices | id | Many-to-One | Mining sessions |
| device_earnings.device_id | mining_devices | id | Many-to-One | Revenue tracking |
| device_earnings.mining_session_id | mining_sessions | id | Many-to-One | Session earnings |
| mining_wallets.user_id | users | id | One-to-One | User wallet |
| withdrawal_requests.user_id | users | id | Many-to-One | Withdrawal requests |
| withdrawal_requests.processed_by | users | id | Many-to-One | Request processing |
| device_alerts.device_id | mining_devices | id | Many-to-One | Device alerts |
| device_alerts.resolved_by | users | id | Many-to-One | Alert resolution |

---
