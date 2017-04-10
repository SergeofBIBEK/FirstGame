 /*:
 * @plugindesc Anything I needed to do cool stuff in my game.
 * @author SergeofBIBEK
 */

var SergeofBIBEK_Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    this._actorCommandWindow.close();
    SergeofBIBEK_Scene_Battle_selectEnemySelection.call(this);
};

var SergeofBIBEK_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    SergeofBIBEK_Scene_Battle_onEnemyCancel.call(this);
    this._actorCommandWindow.open();
};

var SergeofBIBEK_Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    SergeofBIBEK_Scene_Battle_selectActorSelection.call(this);
    this._actorCommandWindow.close();
};

var SergeofBIBEK_Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    SergeofBIBEK_Scene_Battle_onActorCancel.call(this);
    this._actorCommandWindow.open();
};


var SergeofBIBEK_BattleManager_InitMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    SergeofBIBEK_BattleManager_InitMembers.call(this);
    this._SergeCounter = -1;
    this._SergeTarget;
    this._SergeUser = -1;
    this._SergeSkill = -1;
};

var SergeofBIBEK_Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
    if(BattleManager._SergeCounter != -1)
        {
            BattleManager._SergeSkill = this._skillWindow.item();
            
            BattleManager._SergeCounter = -1;
            
            this._skillWindow.hide();
            
            BattleManager.SergeofBIBEK_Counter();
        }
    
    else
        {
            SergeofBIBEK_Scene_Battle_onSkillOk.call(this);
        }
};

var SergeofBIBEK_Scene_Battle_OnSkillCancel = Scene_Battle.prototype.onSkillCancel
Scene_Battle.prototype.onSkillCancel = function() {
    if(BattleManager._SergeCounter != -1)
        {
            BattleManager._SergeCounter = -1;
            
            this._skillWindow.hide();
        }
    else
        {
            SergeofBIBEK_Scene_Battle_OnSkillCancel.call(this);
        }
};

/*BattleManager.prototype.SergeofBIBEK_Counter_Setup = function()
{
    
    Scene_Battle._skillWindow.setActor(this._SergeUser);
    Scene_Battle._skillWindow.setStypeId(2);
    Scene_Battle._skillWindow.refresh();
    Scene_Battle._skillWindow.show();
    Scene_Battle._skillWindow.activate();
}*/

BattleManager.SergeofBIBEK_Counter = function()
{
    
    this.changeActor(this._SergeUser.index(), 'undecided');
    var action = new Game_Action(this._SergeUser);
        
    action.setSkill(this._SergeSkill.id);
    
   /* alert(this._SergeCounter);
    
    action.setTarget(this._SergeCounter);*/
    
    var targets = []
    targets.push(this._SergeTarget);
    this.setTargets(targets);
    this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
    
    this._phase = 'action';
    this._action = action;
    /*this._targets = [];
    this._targets.push(this._SergeTarget);*/
    this._phase = 'phaseChange';
    this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
    this._returnPhase = '';
    this._actionList = [];
    this._SergeUser.useItem(action.item());
    this._action.applyGlobal();
    this.refreshStatus();
    this._logWindow.startAction(this._SergeUser, action, this._targets);
}