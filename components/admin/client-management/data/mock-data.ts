// Mock data for client management
export const mockClients = [
  {
    id: "1",
    companyName: "TechCorp Solutions",
    logo: "/placeholder-logo.svg",
    industry: "Technology",
    location: "New York, NY",
    status: "active",
    contacts: [
      { name: "John Smith", email: "john@techcorp.com", phone: "+1-555-0123" },
      { name: "Sarah Johnson", email: "sarah@techcorp.com", phone: "+1-555-0124" }
    ],
    services: [
      { 
        id: "1", 
        name: "Penetration Testing", 
        frequency: "Quarterly", 
        assets: ["192.168.1.0/24", "app.techcorp.com", "api.techcorp.com", "admin.techcorp.com", "vpn.techcorp.com"] 
      },
      { 
        id: "2", 
        name: "Vulnerability Assessment", 
        frequency: "Monthly", 
        assets: ["10.0.0.0/8", "web.techcorp.com", "db.techcorp.com", "mail.techcorp.com", "backup.techcorp.com", "monitor.techcorp.com", "firewall.techcorp.com", "router.techcorp.com", "switch.techcorp.com", "server1.techcorp.com"] 
      }
    ],
    licenseType: "Enterprise",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    notes: "High priority client with multiple security requirements"
  },
  {
    id: "2",
    companyName: "FinanceFirst Bank",
    logo: "/placeholder-logo.svg",
    industry: "Banking",
    location: "Chicago, IL",
    status: "active",
    contacts: [
      { name: "Michael Brown", email: "michael@financefirst.com", phone: "+1-555-0125" }
    ],
    services: [
      { 
        id: "1", 
        name: "Compliance Audit", 
        frequency: "Annually", 
        assets: ["compliance.financefirst.com", "audit.financefirst.com", "reports.financefirst.com"] 
      },
      { 
        id: "2", 
        name: "Security Assessment", 
        frequency: "Quarterly", 
        assets: ["core.financefirst.com", "api.financefirst.com", "mobile.financefirst.com", "web.financefirst.com", "db.financefirst.com"] 
      }
    ],
    licenseType: "Professional",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    notes: "Regulatory compliance focus"
  },
  {
    id: "3",
    companyName: "HealthCare Plus",
    logo: "/placeholder-logo.svg",
    industry: "Healthcare",
    location: "Los Angeles, CA",
    status: "inactive",
    contacts: [
      { name: "Dr. Emily Davis", email: "emily@healthcareplus.com", phone: "+1-555-0126" }
    ],
    services: [
      { 
        id: "1", 
        name: "HIPAA Compliance", 
        frequency: "Annually", 
        assets: ["patient.healthcareplus.com", "records.healthcareplus.com", "portal.healthcareplus.com", "api.healthcareplus.com", "backup.healthcareplus.com", "archive.healthcareplus.com"] 
      },
      { 
        id: "2", 
        name: "Security Audit", 
        frequency: "Semi-Annually", 
        assets: ["audit.healthcareplus.com", "security.healthcareplus.com", "monitor.healthcareplus.com", "logs.healthcareplus.com", "alerts.healthcareplus.com", "reports.healthcareplus.com"] 
      }
    ],
    licenseType: "Standard",
    startDate: "2023-11-01",
    endDate: "2024-10-31",
    notes: "Contract on hold pending budget approval"
  },
  {
    id: "4",
    companyName: "RetailMax Stores",
    logo: "/placeholder-logo.svg",
    industry: "Retail",
    location: "Miami, FL",
    status: "active",
    contacts: [
      { name: "Lisa Rodriguez", email: "lisa@retailmax.com", phone: "+1-555-0127" }
    ],
    services: [
      { 
        id: "1", 
        name: "PCI Compliance", 
        frequency: "Quarterly", 
        assets: ["pos.retailmax.com", "payment.retailmax.com", "api.retailmax.com"] 
      }
    ],
    licenseType: "Standard",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    notes: "Payment card industry compliance focus"
  },
  {
    id: "5",
    companyName: "Manufacturing Corp",
    logo: "/placeholder-logo.svg",
    industry: "Manufacturing",
    location: "Detroit, MI",
    status: "active",
    contacts: [
      { name: "Robert Wilson", email: "robert@manufacturing.com", phone: "+1-555-0128" }
    ],
    services: [
      { 
        id: "1", 
        name: "Industrial Security", 
        frequency: "Semi-Annually", 
        assets: ["scada.manufacturing.com", "plc.manufacturing.com", "hmi.manufacturing.com"] 
      }
    ],
    licenseType: "Professional",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    notes: "Industrial control systems security"
  },
  {
    id: "6",
    companyName: "Education First",
    logo: "/placeholder-logo.svg",
    industry: "Education",
    location: "Boston, MA",
    status: "active",
    contacts: [
      { name: "Dr. James Miller", email: "james@educationfirst.com", phone: "+1-555-0129" }
    ],
    services: [
      { 
        id: "1", 
        name: "FERPA Compliance", 
        frequency: "Annually", 
        assets: ["student.educationfirst.com", "records.educationfirst.com", "portal.educationfirst.com"] 
      }
    ],
    licenseType: "Standard",
    startDate: "2024-02-15",
    endDate: "2025-02-14",
    notes: "Educational records privacy compliance"
  },
  {
    id: "7",
    companyName: "Energy Solutions",
    logo: "/placeholder-logo.svg",
    industry: "Energy",
    location: "Houston, TX",
    status: "inactive",
    contacts: [
      { name: "Maria Garcia", email: "maria@energysolutions.com", phone: "+1-555-0130" }
    ],
    services: [
      { 
        id: "1", 
        name: "Grid Security", 
        frequency: "Quarterly", 
        assets: ["scada.energysolutions.com", "grid.energysolutions.com", "monitor.energysolutions.com"] 
      }
    ],
    licenseType: "Enterprise",
    startDate: "2023-12-01",
    endDate: "2024-11-30",
    notes: "Smart grid security assessment"
  },
  {
    id: "8",
    companyName: "Transportation Co",
    logo: "/placeholder-logo.svg",
    industry: "Transportation",
    location: "Atlanta, GA",
    status: "active",
    contacts: [
      { name: "David Lee", email: "david@transportation.com", phone: "+1-555-0131" }
    ],
    services: [
      { 
        id: "1", 
        name: "Fleet Security", 
        frequency: "Monthly", 
        assets: ["fleet.transportation.com", "tracking.transportation.com", "dispatch.transportation.com"] 
      }
    ],
    licenseType: "Professional",
    startDate: "2024-01-10",
    endDate: "2024-12-09",
    notes: "Fleet management security"
  },
  {
    id: "9",
    companyName: "Real Estate Group",
    logo: "/placeholder-logo.svg",
    industry: "Real Estate",
    location: "Seattle, WA",
    status: "active",
    contacts: [
      { name: "Jennifer Taylor", email: "jennifer@realestate.com", phone: "+1-555-0132" }
    ],
    services: [
      { 
        id: "1", 
        name: "Property Security", 
        frequency: "Semi-Annually", 
        assets: ["properties.realestate.com", "tenants.realestate.com", "maintenance.realestate.com"] 
      }
    ],
    licenseType: "Standard",
    startDate: "2024-03-15",
    endDate: "2025-03-14",
    notes: "Property management security"
  },
  {
    id: "10",
    companyName: "Consulting Firm",
    logo: "/placeholder-logo.svg",
    industry: "Consulting",
    location: "Washington, DC",
    status: "active",
    contacts: [
      { name: "Thomas Anderson", email: "thomas@consulting.com", phone: "+1-555-0133" }
    ],
    services: [
      { 
        id: "1", 
        name: "Client Security", 
        frequency: "Quarterly", 
        assets: ["clients.consulting.com", "projects.consulting.com", "reports.consulting.com"] 
      }
    ],
    licenseType: "Professional",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    notes: "Client data protection"
  },
  {
    id: "11",
    companyName: "Media Company",
    logo: "/placeholder-logo.svg",
    industry: "Media",
    location: "Los Angeles, CA",
    status: "active",
    contacts: [
      { name: "Sarah Williams", email: "sarah@media.com", phone: "+1-555-0134" }
    ],
    services: [
      { 
        id: "1", 
        name: "Content Security", 
        frequency: "Monthly", 
        assets: ["content.media.com", "streaming.media.com", "cdn.media.com"] 
      }
    ],
    licenseType: "Enterprise",
    startDate: "2024-01-20",
    endDate: "2024-12-19",
    notes: "Digital content protection"
  },
  {
    id: "12",
    companyName: "Insurance Corp",
    logo: "/placeholder-logo.svg",
    industry: "Insurance",
    location: "Hartford, CT",
    status: "inactive",
    contacts: [
      { name: "Michael Johnson", email: "michael@insurance.com", phone: "+1-555-0135" }
    ],
    services: [
      { 
        id: "1", 
        name: "Data Protection", 
        frequency: "Annually", 
        assets: ["claims.insurance.com", "policies.insurance.com", "customers.insurance.com"] 
      }
    ],
    licenseType: "Professional",
    startDate: "2023-10-01",
    endDate: "2024-09-30",
    notes: "Customer data security"
  }
]
