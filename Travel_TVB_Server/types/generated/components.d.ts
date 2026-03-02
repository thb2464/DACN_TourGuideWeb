import type { Schema, Struct } from '@strapi/strapi';

export interface ButtonCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_button_cta_buttons';
  info: {
    displayName: 'Cta_button';
  };
  attributes: {
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface ButtonNavButton extends Struct.ComponentSchema {
  collectionName: 'components_button_nav_buttons';
  info: {
    displayName: 'Nav_button';
  };
  attributes: {
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface ButtonNavigationButtons extends Struct.ComponentSchema {
  collectionName: 'components_button_navigation_buttons';
  info: {
    displayName: 'navigationButtons';
  };
  attributes: {
    navigationText: Schema.Attribute.String;
    path: Schema.Attribute.String;
  };
}

export interface ButtonTermsAndServices extends Struct.ComponentSchema {
  collectionName: 'components_button_terms_and_services';
  info: {
    displayName: 'Terms_and_Services';
  };
  attributes: {
    path: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface MenuItemContactItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_item_contact_items';
  info: {
    displayName: 'Contact_Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface MenuItemFooterMenu1Item extends Struct.ComponentSchema {
  collectionName: 'components_menu_item_footer_menu1_items';
  info: {
    displayName: 'Footer_Menu1_Item';
  };
  attributes: {
    path: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface MenuItemFooterMenu2Item extends Struct.ComponentSchema {
  collectionName: 'components_menu_item_footer_menu2_items';
  info: {
    displayName: 'Footer_Menu2_Item';
  };
  attributes: {
    path: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface SlidesPartner extends Struct.ComponentSchema {
  collectionName: 'components_slides_partners';
  info: {
    displayName: 'Partner';
  };
  attributes: {
    Description: Schema.Attribute.String;
    PartnerLogo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    PartnerName: Schema.Attribute.String;
  };
}

export interface SlidesSlide extends Struct.ComponentSchema {
  collectionName: 'components_slides_slides';
  info: {
    displayName: 'Slide';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    buttonPath: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    navTextLine1: Schema.Attribute.String;
    navTextLine2: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SlidesStatisticSlide extends Struct.ComponentSchema {
  collectionName: 'components_slides_statistic_slides';
  info: {
    displayName: 'StatisticSlide';
  };
  attributes: {
    line1: Schema.Attribute.String;
    line2: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SlidesYear extends Struct.ComponentSchema {
  collectionName: 'components_slides_years';
  info: {
    displayName: 'Year';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String;
    Year: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'button.cta-button': ButtonCtaButton;
      'button.nav-button': ButtonNavButton;
      'button.navigation-buttons': ButtonNavigationButtons;
      'button.terms-and-services': ButtonTermsAndServices;
      'menu-item.contact-item': MenuItemContactItem;
      'menu-item.footer-menu1-item': MenuItemFooterMenu1Item;
      'menu-item.footer-menu2-item': MenuItemFooterMenu2Item;
      'slides.partner': SlidesPartner;
      'slides.slide': SlidesSlide;
      'slides.statistic-slide': SlidesStatisticSlide;
      'slides.year': SlidesYear;
    }
  }
}
