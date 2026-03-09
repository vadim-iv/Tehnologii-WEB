class PAGES_CONFIG {
    HOME = "/"
    LIBRARY = "/library"
    EVENTS = "/events"
    CAFETERIA = "/cafeteria"

    getNavLinks() {
        return [
            { text: "Acasă", href: this.HOME },
            { text: "Bibliotecă", href: this.LIBRARY },
            { text: "Evenimente", href: this.EVENTS },
            { text: "Cantină", href: this.CAFETERIA },
        ]
    }
}

export const PAGES = new PAGES_CONFIG()