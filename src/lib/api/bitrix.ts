export interface BitrixClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  createdDate: string;
  lastActivity: string;
}

export interface BitrixProject {
  id: string;
  title: string;
  description: string;
  status: string;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
  assignedTo: string[];
}

export interface BitrixCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  clientId: string;
  projects: string[];
  totalSpent: number;
  status: string;
}

// Mock data - In production, replace with actual Bitrix24 API calls
const mockClients: BitrixClient[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1-555-0123',
    company: 'Acme Corp',
    status: 'Active',
    createdDate: '2024-01-15',
    lastActivity: '2024-12-20'
  },
  {
    id: '2',
    name: 'Tech Solutions Ltd',
    email: 'info@techsolutions.com',
    phone: '+1-555-0456',
    company: 'Tech Solutions',
    status: 'Active',
    createdDate: '2024-02-10',
    lastActivity: '2024-12-19'
  }
];

const mockProjects: BitrixProject[] = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete website redesign with modern UI/UX',
    status: 'In Progress',
    clientId: '1',
    clientName: 'Acme Corporation',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    progress: 75,
    budget: 50000,
    assignedTo: ['John Doe', 'Jane Smith']
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native mobile app for iOS and Android',
    status: 'Planning',
    clientId: '2',
    clientName: 'Tech Solutions Ltd',
    startDate: '2024-12-15',
    endDate: '2025-03-15',
    progress: 10,
    budget: 75000,
    assignedTo: ['Mike Johnson', 'Sarah Wilson']
  }
];

const mockCustomers: BitrixCustomer[] = [
  {
    id: '1',
    name: 'Jane Customer',
    email: 'jane@customer.com',
    phone: '+1-555-0789',
    clientId: '1',
    projects: ['1'],
    totalSpent: 25000,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Bob Customer',
    email: 'bob@customer.com',
    phone: '+1-555-0987',
    clientId: '2',
    projects: ['2'],
    totalSpent: 15000,
    status: 'Active'
  }
];

export async function fetchAllClients(): Promise<BitrixClient[]> {
  try {
    // Simulate API call delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, make actual API call to Bitrix24
    const response = await fetch(`https://${process.env.BITRIX_DOMAIN}rest/7/${process.env.BITRIX_API_KEY}/crm.lead.list.json`, {
      headers: {
        'Authorization': `Bearer ${process.env.BITRIX_API_KEY}`
      }
    });
    const data = await response.json();
    return data.result;
    
    // return mockClients;
  } catch (error) {
    console.error('Error fetching clients from Bitrix24:', error);
    throw new Error('Failed to fetch client data');
  }
}

export async function fetchClientCustomers(clientId: string): Promise<BitrixCustomer[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter customers by client ID
    const clientCustomers = mockCustomers.filter(customer => customer.clientId === clientId);
    
    return clientCustomers;
  } catch (error) {
    console.error('Error fetching customers from Bitrix24:', error);
    throw new Error('Failed to fetch customer data');
  }
}

export async function fetchProjectDetails(projectId: string): Promise<BitrixProject | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const project = mockProjects.find(p => p.id === projectId);
    return project || null;
  } catch (error) {
    console.error('Error fetching project details from Bitrix24:', error);
    throw new Error('Failed to fetch project details');
  }
}

export async function fetchCustomerProjects(customerId: string): Promise<BitrixProject[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) return [];
    
    const customerProjects = mockProjects.filter(p => 
      customer.projects.includes(p.id)
    );
    
    return customerProjects;
  } catch (error) {
    console.error('Error fetching customer projects from Bitrix24:', error);
    throw new Error('Failed to fetch customer projects');
  }
}
