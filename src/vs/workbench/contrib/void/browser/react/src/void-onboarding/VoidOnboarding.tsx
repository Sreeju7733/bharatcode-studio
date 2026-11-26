/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import React, { useEffect, useState } from 'react';
import { useAccessor, useIsDark, useSettingsState } from '../util/services.js';
import { KeyRound, Sparkles, SlidersHorizontal, ArrowRight, ExternalLink } from 'lucide-react';
import { VOID_OPEN_SETTINGS_ACTION_ID } from '../../../voidSettingsPane.js';
import ErrorBoundary from '../sidebar-tsx/ErrorBoundary.js';

const OVERRIDE_VALUE = false

export const VoidOnboarding = () => {
	const voidSettingsState = useSettingsState()
	const isOnboardingComplete = voidSettingsState.globalSettings.isOnboardingComplete || OVERRIDE_VALUE
	const isDark = useIsDark()

	return (
		<div className={`@@void-scope ${isDark ? 'dark' : ''}`}>
			<div
				className={`
					bg-[#0E0F0B] text-neutral-100 fixed top-0 right-0 bottom-0 left-0 width-full z-[99999]
					transition-all duration-700 ${isOnboardingComplete ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
				`}
				style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<ErrorBoundary>
					<VoidOnboardingContent />
				</ErrorBoundary>
			</div>
		</div>
	)
}

const VoidOnboardingContent = () => {
	const accessor = useAccessor()
	const voidSettingsService = accessor.get('IVoidSettingsService')
	const voidMetricsService = accessor.get('IMetricsService')
	const commandService = accessor.get('ICommandService')
	const voidSettingsState = useSettingsState()

	const initialKey = voidSettingsState.settingsOfProvider?.['bharatcode']?.apiKey || ''
	const [apiKey, setApiKey] = useState(initialKey)
	const [isSaving, setIsSaving] = useState(false)

	const finish = ({ skipped }: { skipped: boolean }) => {
		setIsSaving(true)
		if (apiKey.trim()) {
			voidSettingsService.setSettingOfProvider('bharatcode', 'apiKey', apiKey.trim())
		}
		voidSettingsService.setGlobalSetting('isOnboardingComplete', true)
		voidMetricsService.capture('Completed Onboarding', {
			skipped,
			chatProviderName: 'bharatcode'
		})
	}

	const openAdvancedSettings = () => {
		voidSettingsService.setGlobalSetting('isOnboardingComplete', true)
		commandService.executeCommand(VOID_OPEN_SETTINGS_ACTION_ID)
	}

	return (
		<div className="w-full max-w-lg mx-auto p-8 rounded-2xl bg-[#141612] border border-[#23271E] shadow-2xl flex flex-col items-center text-center">
			{/* Brand Badge */}
			<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2317] border border-[#B8FF43]/30 text-[#B8FF43] text-xs font-medium tracking-wide mb-6">
				<Sparkles className="size-3.5" />
				<span>AI CODE EDITOR</span>
			</div>

			{/* Logo / Header */}
			<h1 className="text-3xl font-bold tracking-tight text-white mb-2">
				BharatCode Studio
			</h1>
			<p className="text-sm text-neutral-400 mb-8 max-w-sm">
				Welcome to the next-generation AI code editor powered by BharatCode. Enter your API key below to get started.
			</p>

			{/* Input Section */}
			<div className="w-full text-left space-y-2 mb-6">
				<label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
					<span className="flex items-center gap-1.5">
						<KeyRound className="size-3.5 text-[#B8FF43]" />
						BharatCode API Key
					</span>
					<a
						href="https://bharatcode.ai"
						target="_blank"
						rel="noreferrer"
						className="text-xs text-[#B8FF43] hover:underline inline-flex items-center gap-1 font-normal lowercase"
					>
						get a key <ExternalLink className="size-3" />
					</a>
				</label>
				<div className="relative">
					<input
						type="password"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								finish({ skipped: false })
							}
						}}
						placeholder="bc-key..."
						autoFocus
						className="w-full px-4 py-3 rounded-xl bg-[#0E0F0B] border border-[#2D3325] text-white placeholder-neutral-500 text-sm focus:border-[#B8FF43] focus:ring-1 focus:ring-[#B8FF43] transition-all outline-none font-mono"
					/>
				</div>
				<p className="text-[11px] text-neutral-400 mt-1">
					Default model <code className="text-[#B8FF43] bg-[#1E2317] px-1 py-0.5 rounded">glm-5.3-flash</code> will be used for Chat, Agent, and Autocomplete.
				</p>
			</div>

			{/* Actions */}
			<div className="w-full space-y-3">
				<button
					type="button"
					onClick={() => finish({ skipped: false })}
					disabled={isSaving}
					className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-[#B8FF43] text-[#0E0F0B] hover:brightness-110 active:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#B8FF43]/10"
				>
					<span>Start Coding</span>
					<ArrowRight className="size-4" />
				</button>

				<div className="flex items-center justify-between pt-2">
					<button
						type="button"
						onClick={openAdvancedSettings}
						className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
					>
						<SlidersHorizontal className="size-3.5" />
						<span>Configure other providers</span>
					</button>
					<button
						type="button"
						onClick={() => finish({ skipped: true })}
						className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
					>
						Set up later
					</button>
				</div>
			</div>
		</div>
	)
}
