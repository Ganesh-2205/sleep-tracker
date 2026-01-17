
import Link from 'next/link';
import { Moon, ArrowRight, Activity, BarChart3, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="absolute inset-x-0 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-500/30">
                <Moon className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                SleepTracker
              </span>
            </div>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative isolate pt-32 pb-16 sm:pt-48 sm:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700 dark:hover:ring-gray-600">
                Newly updated with React 19 & Next.js 15.
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Master your sleep, <br />
              <span className="text-indigo-600">master your life.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Track your sleep patterns, get personalized insights, and wake up refreshed.
              Join thousands of users who have improved their sleep quality with our advanced analytics.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="group relative rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105"
              >
                Start Tracking Free
                <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 hover:text-indigo-600 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Visualize your sleep journey with beautiful, interactive charts and daily reports.',
              },
              {
                icon: Activity,
                title: 'Real-time Tracking',
                desc: 'Log your sleep instantly and monitor your trends across weeks and months.',
              },
              {
                icon: Shield,
                title: 'Private & Secure',
                desc: 'Your health data is encrypted and secure. We prioritize your privacy above all.',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-indigo-100 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-indigo-900 transition-all hover:-translate-y-1">
                <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
