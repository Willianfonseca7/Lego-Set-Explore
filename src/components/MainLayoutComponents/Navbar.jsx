import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Container,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../../context/CartContext";
import { ThemeContext } from '../../context/ThemeContext';
import { LanguageContext } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';
import categoryDataBilingual from '../../data/categoryData.json';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { cartCount } = useCart();
  const t = translations[language].nav;
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [productsAnchorEl, setProductsAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const searchRef = useRef(null);
  
  const categoryData = categoryDataBilingual[language];
  const openLanguageMenu = Boolean(languageAnchorEl);
  const openProductsMenu = Boolean(productsAnchorEl);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search results computed from search query
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length === 0) {
      return [];
    }
    
    const results = [];
    categoryData.forEach(category => {
      if (category.products && Array.isArray(category.products)) {
        category.products.forEach(product => {
          if (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            results.push({
              ...product,
              categorySlug: category.slug,
              categoryName: category.name
            });
          }
        });
      }
    });
    return results.slice(0, 5); // Limit to 5 results
  }, [searchQuery, categoryData]);

  const showDropdown = searchResults.length > 0 && searchQuery.trim().length > 0;

  const handleProductClick = (product) => {
    setSearchQuery('');
    navigate(`/product/${product.categorySlug}/${product.slug}`);
  };

  const getCategoryFolderName = (slug) => {
    const folderMap = {
      'books': 'Books',
      'lego': 'Lego',
      'hot-wheels': 'Hotwheels',
      'puzzles': 'Puzzles'
    };
    return folderMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const handleSwitchToRegister = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    if (lang !== language) {
      toggleLanguage();
    }
    handleLanguageMenuClose();
  };

  const handleProductsMenuOpen = (event) => {
    setProductsAnchorEl(event.currentTarget);
  };

  const handleProductsMenuClose = () => {
    setProductsAnchorEl(null);
  };

  const handleCategoryClick = (categorySlug) => {
    navigate(`/products?category=${categorySlug}`);
    handleProductsMenuClose();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
  };

  const handleMobileCategoryClick = (categorySlug) => {
    navigate(`/products?category=${categorySlug}`);
    closeMobileMenu();
  };

  const toggleMobileProducts = () => {
    setMobileProductsOpen(!mobileProductsOpen);
  };

  return (
    <>
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: darkMode ? "#020617" : "#ffffff",
        color: darkMode ? "#e5e7eb" : "#111827",
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,0,0,0.6)"
          : "0 2px 8px rgba(15,23,42,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1, sm: 0 },
          }}
        >
          {/* Left Side: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* LOGO */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                alt="ToyTopia Logo"
                src="/Logo.png"
                sx={{ 
                  height: { xs: 36, sm: 42, md: 48 },
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>

          {/* SEARCH BAR IN THE MIDDLE - Hidden on mobile */}
          <Box 
            ref={searchRef}
            sx={{ 
              position: 'relative',
              flex: '0 1 400px',
              mx: 3,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: '8px',
                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(241,245,249,1)',
                border: '1px solid #d1d5db',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(226,232,240,1)',
                },
                display: 'flex',
                alignItems: 'center',
                px: 2,
              }}
            >
              <SearchIcon sx={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)', mr: 1 }} />
              <InputBase
                placeholder={language === 'en' ? 'Search products...' : 'Produkte suchen...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  color: darkMode ? 'white' : 'black',
                  width: '100%',
                  py: 1,
                  '& input::placeholder': {
                    color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Dropdown Results */}
            {showDropdown && searchResults.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  mt: 1,
                  backgroundColor: darkMode ? '#1e293b' : 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  border: '1px solid',
                  borderColor: darkMode ? '#334155' : '#e5e7eb',
                }}
              >
                {searchResults.map((product, index) => {
                  const imageUrl = product.image && product.image.length > 0 
                    ? `/src/assets/images/Category-Images/${getCategoryFolderName(product.categorySlug)}/${product.image[0]}`
                    : '/placeholder.png';
                  
                  return (
                    <Box
                      key={`${product.categorySlug}-${product.slug}-${index}`}
                      onClick={() => handleProductClick(product)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        cursor: 'pointer',
                        borderBottom: index < searchResults.length - 1 ? '1px solid' : 'none',
                        borderColor: darkMode ? '#334155' : '#e5e7eb',
                        '&:hover': {
                          backgroundColor: darkMode ? '#334155' : '#f3f4f6',
                        },
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginRight: '12px',
                        }}
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ fontWeight: 500, color: darkMode ? 'white' : 'black', mb: 0.5 }}>
                          {product.name}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ color: darkMode ? '#a78bfa' : '#7c3aed', fontWeight: 600 }}>
                            €{product.price}
                          </Box>
                          <Box sx={{ 
                            fontSize: '0.875rem',
                            color: product.stock > 0 
                              ? (darkMode ? '#4ade80' : '#16a34a')
                              : (darkMode ? '#f87171' : '#dc2626')
                          }}>
                            {product.stock > 0 
                              ? `${translations[language].productsPage.inStock}: ${product.stock}`
                              : translations[language].productsPage.outOfStock
                            }
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* LINKS + TOGGLE ON THE RIGHT - Hidden on mobile */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center", gap: 3 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              {t.home}
            </Button>
            <Button
              onClick={handleProductsMenuOpen}
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ textTransform: "none", fontWeight: 500, whiteSpace: 'nowrap' }}
              aria-controls={openProductsMenu ? 'products-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openProductsMenu ? 'true' : undefined}
            >
              {t.products}
            </Button>
            <Button
              component={Link}
              to="/about"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              {t.about}
            </Button>
            <Button
              component={Link}
              to="/contact-us"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              {t.contact}
            </Button>

            {/* Icons Container with small gap */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                aria-label="Shopping cart"
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>

              <IconButton
                onClick={() => setOpenLoginModal(true)}
                color="inherit"
                aria-label="Sign in"
              >
                <PersonOutlineIcon />
              </IconButton>

              <IconButton
                onClick={toggleDarkMode}
                color="inherit"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Box>
            
            {/* Language Selector with Globe Icon and Dropdown */}
            <Button
              onClick={handleLanguageMenuOpen}
              variant="text"
              startIcon={<LanguageIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ 
                ml: 2, 
                color: 'inherit',
                textTransform: 'none'
              }}
              aria-label="Select language"
              aria-controls={openLanguageMenu ? 'language-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openLanguageMenu ? 'true' : undefined}
            >
              {language === 'en' ? 'EN' : 'DE'}
            </Button>
          </Box>

          {/* Mobile Icons - Shown on mobile only */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              size="small"
              aria-label="Shopping cart"
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => setOpenLoginModal(true)}
              color="inherit"
              size="small"
              aria-label="Sign in"
            >
              <PersonOutlineIcon />
            </IconButton>
            <IconButton
              onClick={handleLanguageMenuOpen}
              color="inherit"
              size="small"
              aria-label="Select language"
              aria-controls={openLanguageMenu ? 'language-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openLanguageMenu ? 'true' : undefined}
            >
              <LanguageIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    {/* Mobile Drawer Menu */}
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={closeMobileMenu}
      PaperProps={{
        sx: {
          width: { xs: 280, sm: 320 },
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#e5e7eb' : '#111827',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ fontWeight: 600, fontSize: '1.25rem' }}>Menu</Box>
        <IconButton onClick={closeMobileMenu} sx={{ color: darkMode ? '#e5e7eb' : '#111827' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: darkMode ? '#334155' : '#e5e7eb' }} />

      <List>
        {/* Home */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={closeMobileMenu}
            sx={{
              '&:hover': {
                backgroundColor: darkMode ? '#334155' : '#f3f4f6',
              },
            }}
          >
            <ListItemText primary={t.home} />
          </ListItemButton>
        </ListItem>

        {/* Products with submenu */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={toggleMobileProducts}
            sx={{
              '&:hover': {
                backgroundColor: darkMode ? '#334155' : '#f3f4f6',
              },
            }}
          >
            <ListItemText primary={t.products} />
            <KeyboardArrowDownIcon
              sx={{
                transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </ListItemButton>
        </ListItem>

        <Collapse in={mobileProductsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: darkMode ? '#334155' : '#f3f4f6',
                },
              }}
              onClick={() => handleMobileCategoryClick('')}
            >
              <ListItemText primary={language === 'en' ? 'All Products' : 'Alle Produkte'} />
            </ListItemButton>
            {categoryData.map((category) => (
              <ListItemButton
                key={category.slug}
                sx={{
                  pl: 4,
                  '&:hover': {
                    backgroundColor: darkMode ? '#334155' : '#f3f4f6',
                  },
                }}
                onClick={() => handleMobileCategoryClick(category.slug)}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* About */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/about"
            onClick={closeMobileMenu}
            sx={{
              '&:hover': {
                backgroundColor: darkMode ? '#334155' : '#f3f4f6',
              },
            }}
          >
            <ListItemText primary={t.about} />
          </ListItemButton>
        </ListItem>

        {/* Contact */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/contact-us"
            onClick={closeMobileMenu}
            sx={{
              '&:hover': {
                backgroundColor: darkMode ? '#334155' : '#f3f4f6',
              },
            }}
          >
            <ListItemText primary={t.contact} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ borderColor: darkMode ? '#334155' : '#e5e7eb', my: 2 }} />

      {/* Mobile Menu Actions */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          startIcon={<DarkModeOutlinedIcon />}
          onClick={() => {
            toggleDarkMode();
          }}
          sx={{
            justifyContent: 'flex-start',
            color: darkMode ? '#e5e7eb' : '#111827',
            textTransform: 'none',
            mb: 1,
          }}
        >
          {darkMode ? (language === 'en' ? 'Dark Mode' : 'Dunkler Modus') : (language === 'en' ? 'Light Mode' : 'Heller Modus')}
        </Button>
        <Button
          fullWidth
          startIcon={<LanguageIcon />}
          onClick={() => {
            toggleLanguage();
          }}
          sx={{
            justifyContent: 'flex-start',
            color: darkMode ? '#e5e7eb' : '#111827',
            textTransform: 'none',
          }}
        >
          {language === 'en' ? 'Deutsch' : 'English'}
        </Button>
      </Box>
    </Drawer>

    {/* Language Menu */}
    <Menu
      id="language-menu"
      anchorEl={languageAnchorEl}
      open={openLanguageMenu}
      onClose={handleLanguageMenuClose}
      MenuListProps={{
        'aria-labelledby': 'language-button',
      }}
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#e5e7eb' : '#111827',
          mt: 1,
          minWidth: 120,
        },
      }}
    >
      <MenuItem 
        onClick={() => handleLanguageChange('en')}
        selected={language === 'en'}
        sx={{
          '&.Mui-selected': {
            backgroundColor: darkMode ? '#334155' : '#f3f4f6',
          },
          '&.Mui-selected:hover': {
            backgroundColor: darkMode ? '#475569' : '#e5e7eb',
          },
        }}
      >
        English
      </MenuItem>
      <MenuItem 
        onClick={() => handleLanguageChange('de')}
        selected={language === 'de'}
        sx={{
          '&.Mui-selected': {
            backgroundColor: darkMode ? '#334155' : '#f3f4f6',
          },
          '&.Mui-selected:hover': {
            backgroundColor: darkMode ? '#475569' : '#e5e7eb',
          },
        }}
      >
        Deutsch
      </MenuItem>
    </Menu>

    {/* Products Menu */}
    <Menu
      id="products-menu"
      anchorEl={productsAnchorEl}
      open={openProductsMenu}
      onClose={handleProductsMenuClose}
      MenuListProps={{
        'aria-labelledby': 'products-button',
      }}
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#e5e7eb' : '#111827',
          mt: 1,
          minWidth: 160,
        },
      }}
    >
      <MenuItem 
        onClick={() => handleCategoryClick('')}
        sx={{
          '&:hover': {
            backgroundColor: darkMode ? '#334155' : '#f3f4f6',
          },
        }}
      >
        {language === 'en' ? 'All Products' : 'Alle Produkte'}
      </MenuItem>
      {categoryData.map((category) => (
        <MenuItem 
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          sx={{
            '&:hover': {
              backgroundColor: darkMode ? '#334155' : '#f3f4f6',
            },
          }}
        >
          {category.name}
        </MenuItem>
      ))}
    </Menu>

    {/* Login Modal */}
    <LoginModal
      open={openLoginModal}
      onClose={() => setOpenLoginModal(false)}
      onSwitchToRegister={handleSwitchToRegister}
    />

    {/* Register Modal */}
    <RegisterModal
      open={openRegisterModal}
      onClose={() => setOpenRegisterModal(false)}
      onSwitchToLogin={handleSwitchToLogin}
    />
    </>
  );
}
