export interface ZohoPayment {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
  status: string;
  description: string;
  customerId: string;
  projectId: string;
}

export interface ZohoInvoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  projectId: string;
  amount: number;
  currency: string;
  status: string;
  issueDate: string;
  dueDate: string;
  paidAmount: number;
  balanceAmount: number;
}

export interface ZohoCustomerSummary {
  customerId: string;
  totalInvoiced: number;
  totalPaid: number;
  totalOutstanding: number;
  currency: string;
  lastPaymentDate: string;
}

// Mock data - In production, replace with actual Zoho Books API calls
const mockPayments: ZohoPayment[] = [
  {
    id: '1',
    invoiceId: 'INV-001',
    amount: 15000,
    currency: 'USD',
    paymentDate: '2024-12-15',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    description: 'Payment for Website Redesign - Phase 1',
    customerId: '1',
    projectId: '1'
  },
  {
    id: '2',
    invoiceId: 'INV-002',
    amount: 10000,
    currency: 'USD',
    paymentDate: '2024-12-18',
    paymentMethod: 'Credit Card',
    status: 'Completed',
    description: 'Payment for Website Redesign - Phase 2',
    customerId: '1',
    projectId: '1'
  },
  {
    id: '3',
    invoiceId: 'INV-003',
    amount: 7500,
    currency: 'USD',
    paymentDate: '2024-12-20',
    paymentMethod: 'PayPal',
    status: 'Completed',
    description: 'Payment for Mobile App Development - Initial',
    customerId: '2',
    projectId: '2'
  }
];

const mockInvoices: ZohoInvoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-001',
    customerId: '1',
    customerName: 'Jane Customer',
    projectId: '1',
    amount: 25000,
    currency: 'USD',
    status: 'Paid',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    paidAmount: 25000,
    balanceAmount: 0
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-002',
    customerId: '2',
    customerName: 'Bob Customer',
    projectId: '2',
    amount: 15000,
    currency: 'USD',
    status: 'Partially Paid',
    issueDate: '2024-12-10',
    dueDate: '2025-01-10',
    paidAmount: 7500,
    balanceAmount: 7500
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-003',
    customerId: '1',
    customerName: 'Jane Customer',
    projectId: '1',
    amount: 10000,
    currency: 'USD',
    status: 'Pending',
    issueDate: '2024-12-20',
    dueDate: '2025-01-20',
    paidAmount: 0,
    balanceAmount: 10000
  }
];

export async function fetchCustomerPayments(customerId: string): Promise<ZohoPayment[]> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, make actual API call to Zoho Books
    // const response = await fetch(`https://books.zoho.com/api/v3/customerpayments`, {
    //   headers: {
    //     'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
    //     'X-com-zoho-books-organizationid': process.env.ZOHO_ORGANIZATION_ID
    //   },
    //   params: {
    //     customer_id: customerId
    //   }
    // });
    // const data = await response.json();
    // return data.customerpayments;
    
    const customerPayments = mockPayments.filter(payment => payment.customerId === customerId);
    return customerPayments;
  } catch (error) {
    console.error('Error fetching payments from Zoho Books:', error);
    throw new Error('Failed to fetch payment data');
  }
}

export async function fetchProjectPayments(projectId: string): Promise<ZohoPayment[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const projectPayments = mockPayments.filter(payment => payment.projectId === projectId);
    return projectPayments;
  } catch (error) {
    console.error('Error fetching project payments from Zoho Books:', error);
    throw new Error('Failed to fetch project payment data');
  }
}

export async function fetchCustomerInvoices(customerId: string): Promise<ZohoInvoice[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // In production, make actual API call to Zoho Books
    // const response = await fetch(`https://books.zoho.com/api/v3/invoices`, {
    //   headers: {
    //     'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
    //     'X-com-zoho-books-organizationid': process.env.ZOHO_ORGANIZATION_ID
    //   },
    //   params: {
    //     customer_id: customerId
    //   }
    // });
    // const data = await response.json();
    // return data.invoices;
    
    const customerInvoices = mockInvoices.filter(invoice => invoice.customerId === customerId);
    return customerInvoices;
  } catch (error) {
    console.error('Error fetching invoices from Zoho Books:', error);
    throw new Error('Failed to fetch invoice data');
  }
}

export async function fetchProjectInvoices(projectId: string): Promise<ZohoInvoice[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const projectInvoices = mockInvoices.filter(invoice => invoice.projectId === projectId);
    return projectInvoices;
  } catch (error) {
    console.error('Error fetching project invoices from Zoho Books:', error);
    throw new Error('Failed to fetch project invoice data');
  }
}

export async function fetchCustomerSummary(customerId: string): Promise<ZohoCustomerSummary> {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const customerInvoices = mockInvoices.filter(invoice => invoice.customerId === customerId);
    const customerPayments = mockPayments.filter(payment => payment.customerId === customerId);
    
    const totalInvoiced = customerInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const totalPaid = customerPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalOutstanding = totalInvoiced - totalPaid;
    
    const lastPayment = customerPayments
      .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())[0];
    
    return {
      customerId,
      totalInvoiced,
      totalPaid,
      totalOutstanding,
      currency: 'USD',
      lastPaymentDate: lastPayment?.paymentDate || 'N/A'
    };
  } catch (error) {
    console.error('Error fetching customer summary from Zoho Books:', error);
    throw new Error('Failed to fetch customer summary');
  }
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function getPaymentStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'paid':
      return 'text-green-600';
    case 'pending':
      return 'text-yellow-600';
    case 'partially paid':
      return 'text-blue-600';
    case 'failed':
    case 'cancelled':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}
