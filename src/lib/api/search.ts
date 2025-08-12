import { BitrixClient, BitrixProject, BitrixCustomer } from './bitrix';

export interface SearchResult {
  type: 'client' | 'customer' | 'project';
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  status?: string;
  data: BitrixClient | BitrixCustomer | BitrixProject;
}

// Mock search data - In production, this would query actual APIs
const mockSearchData = {
  clients: [
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
    },
    {
      id: '3',
      name: 'Digital Innovations Inc',
      email: 'hello@digitalinnovations.com',
      phone: '+1-555-0789',
      company: 'Digital Innovations',
      status: 'Active',
      createdDate: '2024-03-05',
      lastActivity: '2024-12-18'
    }
  ],
  customers: [
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
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice@johnson.com',
      phone: '+1-555-0654',
      clientId: '3',
      projects: ['3'],
      totalSpent: 30000,
      status: 'Active'
    }
  ],
  projects: [
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
    },
    {
      id: '3',
      title: 'E-commerce Platform',
      description: 'Custom e-commerce solution with payment integration',
      status: 'Completed',
      clientId: '3',
      clientName: 'Digital Innovations Inc',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      progress: 100,
      budget: 80000,
      assignedTo: ['David Brown', 'Lisa Davis']
    }
  ]
};

export async function searchAll(query: string): Promise<SearchResult[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];
    
    // Search clients
    mockSearchData.clients.forEach(client => {
      if (
        client.name.toLowerCase().includes(searchTerm) ||
        client.company.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'client',
          id: client.id,
          title: client.name,
          subtitle: client.company,
          description: client.email,
          status: client.status,
          data: client
        });
      }
    });
    
    // Search customers
    mockSearchData.customers.forEach(customer => {
      if (
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'customer',
          id: customer.id,
          title: customer.name,
          subtitle: customer.email,
          description: `Total Spent: $${customer.totalSpent.toLocaleString()}`,
          status: customer.status,
          data: customer
        });
      }
    });
    
    // Search projects
    mockSearchData.projects.forEach(project => {
      if (
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.clientName.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'project',
          id: project.id,
          title: project.title,
          subtitle: project.clientName,
          description: project.description,
          status: project.status,
          data: project
        });
      }
    });
    
    // Sort results by relevance (exact matches first, then partial matches)
    return results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === searchTerm;
      const bExact = b.title.toLowerCase() === searchTerm;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      return a.title.localeCompare(b.title);
    });
    
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to perform search');
  }
}

export async function searchClientSpecific(query: string, clientId: string): Promise<SearchResult[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];
    
    // Search customers for this specific client
    mockSearchData.customers
      .filter(customer => customer.clientId === clientId)
      .forEach(customer => {
        if (
          customer.name.toLowerCase().includes(searchTerm) ||
          customer.email.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            type: 'customer',
            id: customer.id,
            title: customer.name,
            subtitle: customer.email,
            description: `Total Spent: $${customer.totalSpent.toLocaleString()}`,
            status: customer.status,
            data: customer
          });
        }
      });
    
    // Search projects for this specific client
    mockSearchData.projects
      .filter(project => project.clientId === clientId)
      .forEach(project => {
        if (
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            type: 'project',
            id: project.id,
            title: project.title,
            subtitle: project.clientName,
            description: project.description,
            status: project.status,
            data: project
          });
        }
      });
    
    // Sort results by relevance
    return results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === searchTerm;
      const bExact = b.title.toLowerCase() === searchTerm;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      return a.title.localeCompare(b.title);
    });
    
  } catch (error) {
    console.error('Client-specific search error:', error);
    throw new Error('Failed to perform client-specific search');
  }
}

export function getSearchResultIcon(type: string): string {
  switch (type) {
    case 'client':
      return '🏢';
    case 'customer':
      return '👤';
    case 'project':
      return '📋';
    default:
      return '🔍';
  }
}

export function getSearchResultColor(type: string): string {
  switch (type) {
    case 'client':
      return 'bg-blue-100 text-blue-800';
    case 'customer':
      return 'bg-green-100 text-green-800';
    case 'project':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
