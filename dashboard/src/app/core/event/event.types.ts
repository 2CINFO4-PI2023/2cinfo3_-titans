export interface Event
{
  name: string;
  date: Date;
  description: string;
  address?: string;
  inscriptions: string; 
  event_capacity: number; 
  availablePlaces: number; 
  eventType: string; 
}
