// src/utils/mockData.js

const getImg = (seed) => `https://picsum.photos/seed/${seed}/800/600`;

const mockData = {
    '/api/hero-slider': {
        data: {
            Slide: [
                {
                    id: 1,
                    backgroundImage: { url: getImg('vietnam1') },
                    Title: "Discover the Beauty of Ha Long Bay",
                    navTextLine1: "Ha Long Bay",
                    navTextLine2: "Cruise",
                    buttonText: "Explore Now",
                    buttonPath: "/destinations"
                },
                {
                    id: 2,
                    backgroundImage: { url: getImg('vietnam2') },
                    Title: "Experience the Ancient Town of Hoi An",
                    navTextLine1: "Hoi An",
                    navTextLine2: "Lanterns",
                    buttonText: "View Tours",
                    buttonPath: "/tours"
                }
            ]
        }
    },
    '/api/statistic': {
        data: {
            StatisticSlide: [
                { id: 1, value: "15K+", line1: "Happy", line2: "Travelers" },
                { id: 2, value: "300+", line1: "Vietnam", line2: "Destinations" },
                { id: 3, value: "50+", line1: "Expert", line2: "Local Guides" },
                { id: 4, value: "10+", line1: "Years", line2: "Experience" }
            ]
        }
    },
    '/api/commitment': {
        data: {
            PreTitle: "Why Choose Us",
            Title: "Our Commitment to the Ultimate Vietnam Experience",
            Descriptions: [{ type: "paragraph", children: [{ text: "We guarantee the best, most authentic tours across all of Vietnam." }] }],
            buttonText: "Read More",
            buttonPath: "/about",
            Image: { url: getImg('commitment') }
        }
    },
    '/api/home-diagram': {
        data: {
            Title: "How Our Tours Work",
            Subtitle: "Simple booking process",
            Diagram_item: [
                { id: 1, Title: "Book", Descriptions: "Select your destination.", diagramImage: { url: getImg('d1') } },
                { id: 2, Title: "Travel", Descriptions: "Enjoy the Vietnam journey.", diagramImage: { url: getImg('d2') } },
                { id: 3, Title: "Memories", Descriptions: "Unforgettable moments.", diagramImage: { url: getImg('d3') } }
            ]
        }
    },
    '/api/portfolio': {
        data: {
            Portfolio_Subtitle: "Discover",
            Portfolia_Title: "Popular Vietnam Destinations",
            Year: [
                { Year: 2024, Title: "Da Nang Beach", Description: "Coastal paradise.", Image: { url: getImg('danang') } },
                { Year: 2023, Title: "Sapa Trekking", Description: "Mountain views.", Image: { url: getImg('sapa') } }
            ],
            Partner: [
                { PartnerName: "Vietnam Airlines", Description: "Official Carrier", PartnerLogo: { url: getImg('partner1') } },
                { PartnerName: "Vinpearl", Description: "Luxury Stays", PartnerLogo: { url: getImg('partner2') } }
            ]
        }
    },
    '/api/faq': {
        data: {
            MainTitle: [{ type: "paragraph", children: [{ text: "Frequently Asked Questions" }] }],
            Question: [
                { id: 1, Question: "Do I need a visa for Vietnam?", Answer: [{ type: "paragraph", children: [{ text: "It depends on your nationality. Many countries have exemptions." }] }] },
                { id: 2, Question: "What is the best time to visit?", Answer: [{ type: "paragraph", children: [{ text: "Spring (Feb-April) and Autumn (Aug-Oct) are generally best." }] }] }
            ]
        }
    },
    '/api/about-hero': {
        data: {
            Title: "About Our Travel Agency",
            Highlight: "Vietnam's Best",
            Subtitle: [{ type: "paragraph", children: [{ text: "We provide the most authentic travel experiences in Vietnam." }] }],
            Cta_button: { Text: "Read More", Url: "/about" },
            BackgroundImage: { url: getImg('aboutbg') }
        }
    },
    '/api/about-journey': {
        data: {
            Highlight: "Our Story",
            Title: "Our Journey Through Vietnam",
            TimelineEvents: [
                { id: 1, date: "2010", cardTitle: "Agency Founded in Hanoi", cardDescription: "Started as a small local guide team." },
                { id: 2, date: "2015", cardTitle: "Expanded to Ho Chi Minh", cardDescription: "Growing our southern presence." }
            ]
        }
    },
    '/api/about-team': {
        data: {
            Team_highlight: "The Team",
            Team_title: "Meet Our Local Guides",
            Team_leader_subtible: "Management Team",
            Director_Subtitle: "Board of Directors",
            Team_expert_subtitle: "Travel Experts",
            Leader: [
                { Leader_name: "Nguyen Van A", Leader_postition: "CEO", Leader_email: "ceo@traveltvb.vn", Leader_image: { url: getImg('guide1') }, Leader_descriptions: "20 years of experience" }
            ],
            Director: [
                { Director_Name: "Le Thi C", Director_Position: "Director", Director_Email: "dir@traveltvb.vn", Director_Image: { url: getImg('guide3') }, Director_Descriptions: "Strategic planning" }
            ],
            Expert: [
                { Expert_name: "Tran Thi B", Expert_position: "Tour Guide", Expert_email: "guide@traveltvb.vn", Expert_image: { url: getImg('guide2') }, Expert_descriptions: "Local specialist" }
            ]
        }
    },
    '/api/about-core-value': {
        data: {
            Title: "Our Core Values",
            Subtitle: "What drives us",
            ValueItems: [
                { id: 1, Title: "Integrity", Description: "Honest pricing and local fair trade.", Icon: { url: getImg('icon_integrity') } },
                { id: 2, Title: "Passion", Description: "We love Vietnam and traveling.", Icon: { url: getImg('icon_passion') } }
            ]
        }
    },
    '/api/service-hero': {
        data: {
            Title: "Our Services in Vietnam",
            Highlight: "Comprehensive Packages",
            Subtitle: [{ type: "paragraph", children: [{ text: "From north to south, we've got you covered." }] }],
            Cta_button: { Text: "View Services", Url: "/services" }
        }
    },
    '/api/services-insurance-type': {
        data: {
            InsuranceType_mainTitle: "Travel Insurance Options",
            tabs: [
                {
                    id: 1,
                    tabTitle: "Basic Coverage",
                    icon: "specialty",
                    content: {
                        FeaturedImage: { url: getImg('insurance1') },
                        Heading: "Standard Medical",
                        descriptions: [{ type: "paragraph", children: [{ text: "Basic medical and emergency covers." }] }],
                        includesTitle: "Includes:",
                        items: [{ bulletText: "Doctor visits" }, { bulletText: "Medicine" }],
                        ctaText: "Get Quote"
                    }
                }
            ]
        }
    },
    '/api/contact-map': {
        data: {
            Map_title: "Find Us in Vietnam",
            ContactInfo: [
                { id: 1, Icon: "Building", Title: "Headquarters", Details: "123 Old Quarter, Hanoi" },
                { id: 2, Icon: "Phone", Title: "Phone", Details: "+84 123 456 789" }
            ]
        }
    },
    '/api/news-hero': {
        data: {
            Title: "Vietnam Travel News",
            Highlight: "Latest Updates",
            Subtitle: [{ type: "paragraph", children: [{ text: "Keep up to date with the latest travel regulations and spots." }] }]
        }
    },
    '/api/community-hero': {
        data: {
            Title: "Vietnam Backpacker Community",
            Subtitle: [{ type: "paragraph", children: [{ text: "Join thousands of travelers exploring Vietnam." }] }]
        }
    },
    '/api/individual-services': {
        data: [
            { id: 1, slug: "visa", Simplified_Title: "Visa Assistance", Simplified_description: "We help with Vietnam E-Visa.", main_Service_Featured_Image: { url: getImg('visa') } },
            { id: 2, slug: "airport", Simplified_Title: "Airport Transfer", Simplified_description: "Pick up from airport.", main_Service_Featured_Image: { url: getImg('airport') } }
        ]
    },
    '/api/layout-navbar': {
        data: {
            logo: { url: getImg('logo') },
            links: [
                { id: 1, label: "Home", url: "/" },
                { id: 2, label: "Destinations", url: "/destinations" },
                { id: 3, label: "Tours", url: "/tours" },
                { id: 4, label: "Contact", url: "/contact" }
            ]
        }
    },
    '/api/layout-footer': {
        data: {
            Footer_description: "Your best local partner for Vietnam traveling.",
            Social_links: []
        }
    },
    '/api/single-posts': {
        data: [
            {
                id: 1,
                slug: "best-street-foods-saigon",
                post_category: { Category_Name: "Food", Category_Slug: "food" },
                PostTitle: "10 Best Street Foods in Saigon",
                author: { DisplayName: "Admin", AuthorAvatar: { url: getImg('admin') } },
                createdAt: new Date().toISOString(),
                Content: [{ type: "paragraph", children: [{ text: "Pho, Banh Mi, Goi Cuon, etc." }] }],
                Featured_Image: { url: getImg('food') }
            }
        ],
        meta: { pagination: { total: 1 } }
    },
    '/api/single-community-posts': {
        data: [
            {
                id: 1,
                slug: "ha-giang-loop",
                post_category: { Category_Name: "Adventure", Category_Slug: "adventure" },
                PostTitle: "My motorbike trip through Ha Giang loop",
                author: { DisplayName: "Traveler123", AuthorAvatar: { url: getImg('traveler') } },
                publishedAt: new Date().toISOString(),
                Content: [{ type: "paragraph", children: [{ text: "Amazing views and challenging roads!" }] }],
                Featured_Image: { url: getImg('hagiang') }
            }
        ],
        meta: { pagination: { total: 1 } }
    },
    '/api/layout-popular-post': {
        data: {
            Title: "Popular Articles",
            popular_posts: [
                { id: 1, Title: "Top tips for visiting Hue Imperial City" }
            ]
        }
    },
    '/api/layout-cta-banner': {
        data: {
            Title: "Ready for Vietnam?",
            ButtonText: "Book Now",
            ButtonUrl: "/book"
        }
    },
    '/api/layout-newsletter': {
        data: {
            Title: "Subscribe to our Newsletter",
            Description: "Get the best deals on Vietnam tours."
        }
    }
};

export default mockData;
