import {Body, Controller, Param} from '@nestjs/common'
import { Get, Post }                from '@nestjs/common'
import { Header }             from '@nestjs/common'
import { HttpException }      from '@nestjs/common'
import { Query }              from '@nestjs/common'
import { ClientError }        from '@strategy-api/application-module'
import { StrategyDecisionUseCase, DealDecisionUseCase, DealResultUseCase }    from '@strategy-api/application-module'
import { jsonReplacer }       from '@shared/json-replacer'

import {GetStrategyDecisionQueryDto, GetDealDecisionQueryDto, SaveDealResultBodyDto} from '../dto/index.js'
import { StrategyDecisionApiQueryMapper, DealResultApiQueryMapper, DealDecisionApiQueryMapper }  from '../mappers/index.js'

@Controller()
export class StrategyApiController {
  constructor(
    private strategyDecisionUseCase: StrategyDecisionUseCase,
    private strategyDecisionMapper: StrategyDecisionApiQueryMapper,
    private dealDecisionUseCase: DealDecisionUseCase,
    private dealDecisionMapper: DealDecisionApiQueryMapper,
    private dealResultUseCase: DealResultUseCase,
    private dealResultMapper: DealResultApiQueryMapper,
  ) {}

  @Get('/strategy/:token')
  @Header('Content-Type', 'application/json')
  async getStrategyDecision(
    @Param() params: Record<string, unknown>,
    @Query() query: GetStrategyDecisionQueryDto
  ): Promise<string> {
    const command = this.strategyDecisionMapper.fromDto(params, query)

    try {
      const result = await this.strategyDecisionUseCase.execute(command)

      return JSON.stringify(
        {
          ...result
        },
        jsonReplacer
      )
    } catch (error) {
      if (error instanceof ClientError) {
        throw new HttpException({ message: error.message }, 400)
      }

      throw new HttpException(
        {
          message: `Internal server error`,
        },
        500
      )
    }
  }

  @Get('/decision/:token')
  @Header('Content-Type', 'application/json')
  async getFinalDealDecision(
    @Param() params: Record<string, unknown>,
    @Query() query: GetDealDecisionQueryDto
  ): Promise<string> {
    const command = this.dealDecisionMapper.fromDto(params, query)

    try {
      const result = await this.dealDecisionUseCase.execute(command)

      return JSON.stringify(
        {
          ...result
        },
        jsonReplacer
      )
    } catch (error) {
      if (error instanceof ClientError) {
        throw new HttpException({ message: error.message }, 400)
      }

      throw new HttpException(
        {
          message: `Internal server error`,
        },
        500
      )
    }
  }

  @Post('/deals')
  @Header('Content-Type', 'application/json')
  async saveDealResult(@Body() body: SaveDealResultBodyDto): Promise<string> {
    const command = this.dealResultMapper.fromDto(body)

    try {
      const result = await this.dealResultUseCase.execute(command)

      return JSON.stringify(
        {
          ...result
        },
        jsonReplacer
      )
    } catch (error) {
      if (error instanceof ClientError) {
        throw new HttpException({ message: error.message }, 400)
      }

      throw new HttpException(
        {
          message: `Internal server error`,
        },
        500
      )
    }
  }
}
