import { PAGES } from "@/config/pages.config";
import { Mail, MapPin, Phone } from "lucide-react";

export const quickLinks = [
    {
        name: "Acasă",
        link: PAGES.HOME
    },
    {
        name: "Bibliotecă",
        link: PAGES.LIBRARY
    },
    {
        name: "Cafenenea",
        link: PAGES.CAFETERIA
    },
    {
        name: "Evenimente",
        link: PAGES.EVENTS
    }
]

export const resources = ["Portal student", "Calendar academic", "Hartă campus", "Centru asistență"]

export const contactInfo = [
    {
        icon : Mail,
        text: "info@campusinfohub.edu"
    },
    {
        icon: Phone,
        text: "(021) 123-4567"
    },
    {
        icon: MapPin,
        text: "Str. Universității, nr. 1, București"
    }
]