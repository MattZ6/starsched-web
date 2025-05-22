import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { BaseLayout } from '@/layouts/base'
import { PrivateLayout } from '@/layouts/private'
import { TeamLayout } from '@/layouts/team'
// import { SettingsLayout } from '@/layouts/Settings'

import { SuspenseRouterOutlet } from '@/components/suspense-router-outlet'

const SignInPage = lazy(() => import('@/pages/public/sign-in'))
const SignUpPage = lazy(() => import('@/pages/public/sign-up'))
const AccountConfirmationPage = lazy(() => import('@/pages/public/account-confirmation'))
const ForgotPasswordPage = lazy(() => import('@/pages/public/forgot-password'))
// const PasswordRecoveryPage = lazy(
//   () => import('@/pages/guest/PasswordRecovery'),
// )

const OnboardingPage = lazy(() => import('@/pages/private/onboarding'))

const HomePage = lazy(() => import('@/pages/private/home'))
const TeamPage = lazy(() => import('@/pages/private/team'))
const CompanyInvitesPage = lazy(() => import('@/pages/private/invites'))
// const PatientsPage = lazy(() => import('@/pages/Patients'))
// const PatientPage = lazy(() => import('@/pages/Patient'))
// const AppearancePage = lazy(() => import('@/pages/Settings/Appearance'))
// const NotFoundPage = lazy(() => import('@/pages/NotFound'))

import { PrivateRoutesNavGuard } from './guards/private'
import { PublicRoutesNavGuard } from './guards/public'
import { CompanyRoutesNavGuard } from './guards/company'
import { OnboardingRoutesNavGuard } from './guards/onboarding'

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutesNavGuard />}>
        <Route path="/:companySlug" element={<CompanyRoutesNavGuard />}>
          <Route element={<PrivateLayout />}>
            <Route element={<SuspenseRouterOutlet />}>
              <Route index element={<HomePage />} />
            </Route>

            <Route path="team" element={<TeamLayout />}>
              <Route index element={<TeamPage />} />
              <Route path="invites" element={<CompanyInvitesPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<OnboardingRoutesNavGuard />}>
          <Route element={<BaseLayout />}>
            <Route index element={<OnboardingPage />} />
          </Route>

          {/* <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/:id" element={<PatientPage />} />

          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<AppearancePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Route>

      <Route element={<PublicRoutesNavGuard />}>
        <Route element={<BaseLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/account-confirmation/:id" element={<AccountConfirmationPage />} />
          <Route path="/password/forgot" element={<ForgotPasswordPage />} />
          {/*
          <Route path="/password/recovery" element={<PasswordRecoveryPage />} />
          <Route path="*" element={<NotFoundPage />} />
           */}
        </Route>
      </Route>
    </Routes>
  )
}
