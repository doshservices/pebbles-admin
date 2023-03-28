import overview from "../../assets/overview.svg";
import bookings from "../../assets/bookings.svg";
import group from './icons/Group.svg';
import guest from './icons/guest.svg';
import ride from './icons/ride.svg';
import laundry from './icons/laundry.svg';
import food from './icons/food.svg';
import events from './icons/events.svg';

export const sideNavLinks = [
    {
        id: 1,
        name: 'Overview',
        path: 'overview',
        icon: overview
    },
    {
        id: 2,

        name: 'Booking List',
        path: 'booking-list',
        icon: bookings
    },
    {
        id: 3,
        name: 'Booking Details',
        path: 'booking-details',
        icon: bookings
    },
    {
        id: 4,
        name: 'Users',
        path: '/users',
        icon: guest
    },
    {
        id: 5,
        name: 'Analytics',
        path: 'analytics',
        icon: group
    },
    {
        id: 6,
        name: 'Reviews',
        path: 'reviews',
        icon: group
    },
    {
        id: 7,
        name: 'User Details',
        path: 'user-details',
        icon: group
    },
    {
        id: 8,
        name: 'Messages',
        path: 'messages',
        icon: group
    }
]

export const addedServicesUrl = [
    {
        id: 1,
        name: 'Ride',
        path: 'ride',
        icon: ride
    },
    {
        id: 2,
        name: 'Laundry',
        path: 'laundry',
        icon: laundry
    },
    {
        id: 3,
        name: 'Vouchers',
        path: 'vouchers',
        icon: group
    },
    {
        id: 4,
        name: 'Food',
        path: 'food',
        icon: food
    },
    {
        id: 5,
        name: 'Events',
        path: 'events',
        icon: events
    }
]