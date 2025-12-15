// API service for Emergency Response app
// API calls to connect with the backend

import { API_BASE_URL } from '../config';

// Types matching the API spec
export interface ResponderDTO {
  id?: number;
  name?: string;
  role?: string;
  availability?: boolean;
}

export interface CreateEmergencyReportDTO {
  type?: string;
  description?: string;
  locationLat?: number;
  locationLng?: number;
  reporterId?: string;
}

export interface EmergencyReport {
  id?: number;
  type?: string;
  description?: string;
  locationLat?: number;
  locationLng?: number;
  timestamp?: string;
  status?: string;
  reporterId?: string;
}

export interface EmergencyResponseDTO {
  reportId?: number;
  responderName?: string;
  responderRole?: string;
  etaMinutes?: number;
}

export interface AssignmentDTO {
  id?: number;
  responderId?: number;
  emergencyId?: number;
  etaMinutes?: number;
}

// API Functions

// Get all responders
export async function getAllResponders(): Promise<ResponderDTO[]> {
  const response = await fetch(`${API_BASE_URL}/responders`);
  if (!response.ok) {
    throw new Error('Failed to fetch responders');
  }
  return response.json();
}

// Get a single responder by ID
export async function getResponder(id: number): Promise<ResponderDTO> {
  const response = await fetch(`${API_BASE_URL}/responders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch responder');
  }
  return response.json();
}

// Update responder location
export async function updateResponderLocation(
  id: number,
  lat: number,
  lng: number
): Promise<ResponderDTO> {
  const response = await fetch(
    `${API_BASE_URL}/responders/${id}/location?lat=${lat}&lng=${lng}`,
    {
      method: 'PATCH',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to update location');
  }
  return response.json();
}

// Create emergency report
export async function createEmergencyReport(
  report: CreateEmergencyReportDTO
): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  });
  if (!response.ok) {
    throw new Error('Failed to create emergency report');
  }
  return response.json();
}

// Get reports by reporter ID
export async function getReportsByReporter(reporterId: string): Promise<EmergencyReport[]> {
  const response = await fetch(`${API_BASE_URL}/alerts/reporter/${reporterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reports');
  }
  return response.json();
}

// Get a single report by ID
export async function getReport(id: number): Promise<EmergencyReport> {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }
  return response.json();
}

// Assign responder to alert
export async function assignResponder(id: number): Promise<EmergencyResponseDTO> {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}/assign`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to assign responder');
  }
  return response.json();
}

// Create assignment
export async function createAssignment(emergencyId: number): Promise<AssignmentDTO> {
  const response = await fetch(`${API_BASE_URL}/assign?emergencyId=${emergencyId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to create assignment');
  }
  return response.json();
}

// Get assignment by emergency ID
export async function getAssignmentByEmergency(
  emergencyId: number
): Promise<AssignmentDTO> {
  const response = await fetch(`${API_BASE_URL}/assign/emergency/${emergencyId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch assignment');
  }
  return response.json();
}

// Get assignment by ID
export async function getAssignment(id: number): Promise<AssignmentDTO> {
  const response = await fetch(`${API_BASE_URL}/assign/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch assignment');
  }
  return response.json();
}
