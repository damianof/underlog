import { expect } from 'chai'
import { UnderLog } from '../../src/UnderLog'
//import { TestItem, testItemHelper } from '@tests/test-item-helper'

describe('UnderLog.canProceed with transportLevelOnly false', () => {

	const underLog = new UnderLog({
		levels: ['info', 'warn', 'warn-high', 'error']
	})
	const transportLevelOnly = false

	describe('transportLevel: log', () => {
		const transportLevel = 'log'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
			expect(result).to.be.true
		})

		it('should return true when level is highlight', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
			expect(result).to.be.true
		})

		it('should return false when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'false'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is warn ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'false'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is warn-high ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})
	
			expect(result).to.be.false
		})
	})

	describe('transportLevel: debug', () => {
		const transportLevel = 'debug'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
			expect(result).to.be.true
		})

		it('should return true when level is highlight', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
			expect(result).to.be.true
		})

		it('should return true when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.true
		})

		it('should return false when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'false'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is warn ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'false'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is warn-high ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})
	
			expect(result).to.be.false
		})
	})

	describe('transportLevel: highlight', () => {
		const transportLevel = 'highlight'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
			expect(result).to.be.true
		})

		it('should return true when level is highlight ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
			expect(result).to.be.true
		})

		it('should return false when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'false'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is warn ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'false'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is warn-high ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})
	
			expect(result).to.be.false
		})

		it('should return false when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})
	
			expect(result).to.be.false
		})
	})

	describe('transportLevel: info', () => {
		const transportLevel = 'info'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is highlight ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'info'
			})
	
			expect(result).to.be.true
		})
		
		it('should return false when level is warn', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn'
			})

			expect(result).to.be.false
		})

		it('should return false when level is warn-high', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})

			expect(result).to.be.false
		})
		
		it('should return false when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})

			expect(result).to.be.false
		})
	})

	describe('transportLevel: warn', () => {
		const transportLevel = 'warn'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is highlight ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'info'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is warn ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn'
			})
	
			expect(result).to.be.true
		})
		
		it('should return false when level is warn-high ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})
	
			expect(result).to.be.false
		})
		
		it('should return false when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})
	
			expect(result).to.be.false
		})
	})

	describe('transportLevel: warn-high', () => {
		const transportLevel = 'warn-high'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is highlight ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'info'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is warn ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn'
			})
	
			expect(result).to.be.true
		})
		
		it('should return true when level is warn-high ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})
	
			expect(result).to.be.true
		})
		
		it('should return false when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})
	
			expect(result).to.be.false
		})
	})

	describe('transportLevel: error', () => {
		const transportLevel = 'error'

		it('should return true when level is log ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'log'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is highlight ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'highlight'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is debug ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'debug'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is info ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'info'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is warn ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is warn-high ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'warn-high'
			})
	
			expect(result).to.be.true
		})

		it('should return true when level is error ', async () => {
			const result = await underLog.canProceed({
				transportLevel: transportLevel,
				transportLevelOnly: transportLevelOnly,
				level: 'error'
			})
	
			expect(result).to.be.true
		})
	})

		
})
