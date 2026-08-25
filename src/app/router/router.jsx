/* eslint-disable react-refresh/only-export-components -- route config file: lazy component refs are local, only `router` is exported */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { AccountLayout } from '@/components/layout/AccountLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { BookingWizardLayout } from '@/features/booking/components/BookingWizardLayout'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const DestinationsListPage = lazy(() => import('@/pages/destinations/DestinationsListPage'))
const DestinationDetailPage = lazy(() => import('@/pages/destinations/DestinationDetailPage'))
const PackagesListPage = lazy(() => import('@/pages/packages/PackagesListPage'))
const PackageDetailPage = lazy(() => import('@/pages/packages/PackageDetailPage'))
const ExperiencesListPage = lazy(() => import('@/pages/experiences/ExperiencesListPage'))
const ExperienceDetailPage = lazy(() => import('@/pages/experiences/ExperienceDetailPage'))
const TravelGuideListPage = lazy(() => import('@/pages/travelGuide/TravelGuideListPage'))
const TravelGuidePostPage = lazy(() => import('@/pages/travelGuide/TravelGuidePostPage'))

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'))

const AccountProfilePage = lazy(() => import('@/pages/account/AccountProfilePage'))
const MyTripsPage = lazy(() => import('@/pages/account/MyTripsPage'))
const FavoritesPage = lazy(() => import('@/pages/account/FavoritesPage'))

const DatesStep = lazy(() => import('@/pages/booking/DatesStepPage'))
const CustomizeStep = lazy(() => import('@/pages/booking/CustomizeStepPage'))
const TravelersStep = lazy(() => import('@/pages/booking/TravelersStepPage'))
const ReviewStep = lazy(() => import('@/pages/booking/ReviewStepPage'))
const PaymentStep = lazy(() => import('@/pages/booking/PaymentStepPage'))
const ConfirmationPage = lazy(() => import('@/pages/booking/ConfirmationPage'))

const SupportPage = lazy(() => import('@/pages/support/SupportPage'))
const ContactPage = lazy(() => import('@/pages/support/ContactPage'))
const FaqPage = lazy(() => import('@/pages/support/FaqPage'))
const AboutPage = lazy(() => import('@/pages/about/AboutPage'))
const NotFoundPage = lazy(() => import('@/pages/notFound/NotFoundPage'))

const routes = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/destinations', element: <DestinationsListPage /> },
      { path: '/destinations/:slug', element: <DestinationDetailPage /> },
      { path: '/packages', element: <PackagesListPage /> },
      { path: '/packages/:slug', element: <PackageDetailPage /> },
      { path: '/experiences', element: <ExperiencesListPage /> },
      { path: '/experiences/:slug', element: <ExperienceDetailPage /> },
      { path: '/travel-guide', element: <TravelGuideListPage /> },
      { path: '/travel-guide/:slug', element: <TravelGuidePostPage /> },
      { path: '/support', element: <SupportPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AccountLayout />,
        children: [
          { path: '/account', element: <AccountProfilePage /> },
          { path: '/my-trips', element: <MyTripsPage /> },
          { path: '/favorites', element: <FavoritesPage /> },
        ],
      },
      {
        path: '/booking/:packageId',
        element: <BookingWizardLayout />,
        children: [
          { index: true, element: <DatesStep /> },
          { path: 'dates', element: <DatesStep /> },
          { path: 'customize', element: <CustomizeStep /> },
          { path: 'travelers', element: <TravelersStep /> },
          { path: 'review', element: <ReviewStep /> },
          { path: 'payment', element: <PaymentStep /> },
        ],
      },
      { path: '/booking/confirmation/:bookingId', element: <ConfirmationPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })
