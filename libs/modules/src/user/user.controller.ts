import {
  Controller,
  Get,
  Headers,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Client as MsGraphClient } from '@microsoft/microsoft-graph-client';
import { AuthGuard } from '../auth/auth.gaurd';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('photo')
  @UseGuards(AuthGuard)
  async getProfilePhoto(@Headers() headers: any): Promise<StreamableFile> {
    try {
      const graphToken: string = await this.userService.getMsGraphAuth(
        headers.authorization.replace('Bearer ', ''),
        ['user.read']
      );
      const client: MsGraphClient =
        await this.userService.getMsGraphClientDelegated(graphToken);
      const blob: Blob = await client.api(`me/photos('48x48')/$value`).get();
      const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
      const buffer: Buffer = Buffer.from(arrayBuffer);

      return new StreamableFile(buffer, {
        type: 'application/json',
        disposition: `attachment; filename="user_photo.png"`
      });
    } catch (error) {
      return error;
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUserProfile(@Headers() headers: any): Promise<any> {
    try {
      const graphToken: string = await this.userService.getMsGraphAuth(
        headers.authorization.replace('Bearer ', ''),
        ['user.read']
      );
      const client: MsGraphClient =
        await this.userService.getMsGraphClientDelegated(graphToken);
      const userProfile = await client.api(`me`).get();

      return userProfile;
    } catch (error) {
      return error;
    }
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async searchUsers(
    @Headers() headers: any,
    @Query('search') search: any
  ): Promise<any> {
    try {
      const accessToken: string = headers.authorization.replace('Bearer ', '');
      const personSearchResults: any[] =
        await this.userService.searchUsers(accessToken, search);

      return personSearchResults;
    } catch (error) {
      return error;
    }
  }
}
