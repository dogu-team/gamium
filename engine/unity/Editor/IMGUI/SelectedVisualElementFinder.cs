using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Gamium.Private;
using Gamium.Private.Object;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace Gamium.Editor.IMGUI
{
    internal class SelectedVisualElementFinder : SelectedObjectFinderBase
    {
        private const string UIElementsUtilityName= "UnityEngine.UIElements.UIElementsUtility";
        private const string UIElementsDebuggerName= "UnityEditor.UIElements.Debugger.UIElementsDebugger";
        private const string UIDebuggerContextName = "UnityEditor.UIElements.Debugger.DebuggerContext";
        
        private Type UIElementsUtilityType;
        private Type UIElementsDebuggerType;
        private Type UIDebuggerContextType;
        
        private MethodInfo UIElementsUtilyity_GetPanelsIteratorMethodInfo;
        private FieldInfo UIElementsDebugger_m_DebuggerContextFieldInfo;
        private PropertyInfo UIDebuggerContext_selectedElementPropertyInfo;
        
        private const uint UPDATE_INTERVAL = 10;
        private uint updateCount = 0;
        private EditorWindow uiBuilderWindow;

        public override void Init(List<Type> types)
        {
            foreach (var type in types)
            {
                if (type.FullName == UIElementsUtilityName) UIElementsUtilityType = type;
                if (type.FullName == UIElementsDebuggerName) UIElementsDebuggerType = type;
                if (type.FullName == UIDebuggerContextName) UIDebuggerContextType = type;
            }

            if (null != UIElementsUtilityType)
            {
                UIElementsUtilyity_GetPanelsIteratorMethodInfo = UIElementsUtilityType.GetMethod("GetPanelsIterator",
                    BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public);
            }
            
            if (null != UIElementsDebuggerType)
            {
                UIElementsDebugger_m_DebuggerContextFieldInfo = UIElementsDebuggerType.GetField("m_DebuggerContext",
                    BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            }

            if (null != UIDebuggerContextType)
            {
                UIDebuggerContext_selectedElementPropertyInfo = UIDebuggerContextType.GetProperty("selectedElement",
                    BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            }
        }
        
        public override void Update()
        {
            updateCount++;
            if (updateCount < UPDATE_INTERVAL)
            {
                return;
            }

            updateCount = 0;


            if (null != UIElementsDebuggerType
                && null != EditorWindow.focusedWindow
                && EditorWindow.focusedWindow.GetType() == UIElementsDebuggerType)
            {
                uiBuilderWindow = EditorWindow.focusedWindow;
                Repaint();
            }
        }

        public override string GetHierarchyPath()
        {
            if (
                UIElementsUtilityType != null
                && UIElementsDebuggerType != null
                && UIDebuggerContextType!= null
                && UIElementsUtilyity_GetPanelsIteratorMethodInfo != null
                && UIElementsDebugger_m_DebuggerContextFieldInfo != null
                && UIDebuggerContext_selectedElementPropertyInfo != null
                && uiBuilderWindow != null)
            {
                var context = UIElementsDebugger_m_DebuggerContextFieldInfo.GetValue(uiBuilderWindow);
                var selection = UIDebuggerContext_selectedElementPropertyInfo.GetValue(context) as VisualElement;
                
                
                var iterator = (IDictionaryEnumerator)UIElementsUtilyity_GetPanelsIteratorMethodInfo.Invoke(null,null) ;
                while (iterator.MoveNext())
                {
                    var panel = iterator.Value as IPanel;
                    if (panel.contextType == ContextType.Player)
                    {
                        return new HierarchyPath(panel.visualTree, selection).ToString();
                    }
                }
            }

            return string.Empty;
        }
    }
}
