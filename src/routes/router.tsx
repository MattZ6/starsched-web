import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { BaseLayout } from '@/layouts/base'
// import { MainLayout } from '@/layouts/Main'
// import { SettingsLayout } from '@/layouts/Settings'
// import { StaffLayout } from '@/layouts/Staff'

import { PrivateRoutesNavGuard } from './guards/private'
import { PublicRoutesNavGuard } from './guards/public'

const SignInPage = lazy(() => import('@/pages/public/sign-in'))
// const SignUpPage = lazy(() => import('@/pages/guest/SignUp'))
// const ForgotPasswordPage = lazy(() => import('@/pages/guest/ForgotPassword'))
// const PasswordRecoveryPage = lazy(
//   () => import('@/pages/guest/PasswordRecovery'),
// )
// const AccountCreationConfirmationPage = lazy(
//   () => import('@/pages/guest/AccountCreationConfirmation'),
// )

const OnboardingPage = lazy(() => import('@/pages/private/onboarding'))

// const HomePage = lazy(() => import('@/pages/Home'))
// const CompanyMembers = lazy(() => import('@/pages/CompanyMembers'))
// const CompanyInvitations = lazy(() => import('@/pages/CompanyInvitations'))
// const PatientsPage = lazy(() => import('@/pages/Patients'))
// const PatientPage = lazy(() => import('@/pages/Patient'))
// const AppearancePage = lazy(() => import('@/pages/Settings/Appearance'))
// const NotFoundPage = lazy(() => import('@/pages/NotFound'))

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutesNavGuard />}>
        <Route index element={<OnboardingPage />} />

        {/* <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<CompanyMembers />} />
            <Route path="invites" element={<CompanyInvitations />} />
          </Route>

          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/:id" element={<PatientPage />} />

          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<AppearancePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route> */}
      </Route>

      {/* <Route path="/onboarding" element={<CompanyOnboardingPage />} /> */}

      <Route element={<PublicRoutesNavGuard />}>
        <Route element={<BaseLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          {/* <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/sign-up/finalize"
            element={<AccountCreationConfirmationPage />}
          />
          <Route path="/password/forgot" element={<ForgotPasswordPage />} />
          <Route path="/password/recovery" element={<PasswordRecoveryPage />} />

          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Route>
    </Routes>
  )
}
