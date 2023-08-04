// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_OBJECTHIERARCHY_GAMIUM_PROTOCOL_TYPES_H_
#define FLATBUFFERS_GENERATED_OBJECTHIERARCHY_GAMIUM_PROTOCOL_TYPES_H_

#include "flatbuffers/flatbuffers.h"

// Ensure the included flatbuffers.h is the same version as when this file was
// generated, otherwise it may not be compatible.
static_assert(FLATBUFFERS_VERSION_MAJOR == 22 &&
              FLATBUFFERS_VERSION_MINOR == 10 &&
              FLATBUFFERS_VERSION_REVISION == 26,
             "Non-compatible flatbuffers version included");

namespace Gamium {
namespace Protocol {
namespace Types {

struct ObjectHierarchyNode;
struct ObjectHierarchyNodeBuilder;
struct ObjectHierarchyNodeT;

struct ObjectsHierarchy;
struct ObjectsHierarchyBuilder;
struct ObjectsHierarchyT;

inline const flatbuffers::TypeTable *ObjectHierarchyNodeTypeTable();

inline const flatbuffers::TypeTable *ObjectsHierarchyTypeTable();

struct ObjectHierarchyNodeT : public flatbuffers::NativeTable {
  typedef ObjectHierarchyNode TableType;
  std::string name{};
  std::string path{};
  std::vector<Gamium::Protocol::Types::ObjectHierarchyNodeT> children{};
};

struct ObjectHierarchyNode FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ObjectHierarchyNodeT NativeTableType;
  typedef ObjectHierarchyNodeBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ObjectHierarchyNodeTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_NAME = 4,
    VT_PATH = 6,
    VT_CHILDREN = 8
  };
  const flatbuffers::String *name() const {
    return GetPointer<const flatbuffers::String *>(VT_NAME);
  }
  const flatbuffers::String *path() const {
    return GetPointer<const flatbuffers::String *>(VT_PATH);
  }
  const flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>> *children() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>> *>(VT_CHILDREN);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_NAME) &&
           verifier.VerifyString(name()) &&
           VerifyOffsetRequired(verifier, VT_PATH) &&
           verifier.VerifyString(path()) &&
           VerifyOffset(verifier, VT_CHILDREN) &&
           verifier.VerifyVector(children()) &&
           verifier.VerifyVectorOfTables(children()) &&
           verifier.EndTable();
  }
  ObjectHierarchyNodeT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(ObjectHierarchyNodeT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<ObjectHierarchyNode> Pack(flatbuffers::FlatBufferBuilder &_fbb, const ObjectHierarchyNodeT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

struct ObjectHierarchyNodeBuilder {
  typedef ObjectHierarchyNode Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_name(flatbuffers::Offset<flatbuffers::String> name) {
    fbb_.AddOffset(ObjectHierarchyNode::VT_NAME, name);
  }
  void add_path(flatbuffers::Offset<flatbuffers::String> path) {
    fbb_.AddOffset(ObjectHierarchyNode::VT_PATH, path);
  }
  void add_children(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>>> children) {
    fbb_.AddOffset(ObjectHierarchyNode::VT_CHILDREN, children);
  }
  explicit ObjectHierarchyNodeBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ObjectHierarchyNode> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ObjectHierarchyNode>(end);
    fbb_.Required(o, ObjectHierarchyNode::VT_NAME);
    fbb_.Required(o, ObjectHierarchyNode::VT_PATH);
    return o;
  }
};

inline flatbuffers::Offset<ObjectHierarchyNode> CreateObjectHierarchyNode(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> name = 0,
    flatbuffers::Offset<flatbuffers::String> path = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>>> children = 0) {
  ObjectHierarchyNodeBuilder builder_(_fbb);
  builder_.add_children(children);
  builder_.add_path(path);
  builder_.add_name(name);
  return builder_.Finish();
}

flatbuffers::Offset<ObjectHierarchyNode> CreateObjectHierarchyNode(flatbuffers::FlatBufferBuilder &_fbb, const ObjectHierarchyNodeT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

struct ObjectsHierarchyT : public flatbuffers::NativeTable {
  typedef ObjectsHierarchy TableType;
  std::string name{};
  std::vector<Gamium::Protocol::Types::ObjectHierarchyNodeT> children{};
};

struct ObjectsHierarchy FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ObjectsHierarchyT NativeTableType;
  typedef ObjectsHierarchyBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ObjectsHierarchyTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_NAME = 4,
    VT_CHILDREN = 6
  };
  const flatbuffers::String *name() const {
    return GetPointer<const flatbuffers::String *>(VT_NAME);
  }
  const flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>> *children() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>> *>(VT_CHILDREN);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_NAME) &&
           verifier.VerifyString(name()) &&
           VerifyOffset(verifier, VT_CHILDREN) &&
           verifier.VerifyVector(children()) &&
           verifier.VerifyVectorOfTables(children()) &&
           verifier.EndTable();
  }
  ObjectsHierarchyT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(ObjectsHierarchyT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<ObjectsHierarchy> Pack(flatbuffers::FlatBufferBuilder &_fbb, const ObjectsHierarchyT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

struct ObjectsHierarchyBuilder {
  typedef ObjectsHierarchy Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_name(flatbuffers::Offset<flatbuffers::String> name) {
    fbb_.AddOffset(ObjectsHierarchy::VT_NAME, name);
  }
  void add_children(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>>> children) {
    fbb_.AddOffset(ObjectsHierarchy::VT_CHILDREN, children);
  }
  explicit ObjectsHierarchyBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ObjectsHierarchy> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ObjectsHierarchy>(end);
    fbb_.Required(o, ObjectsHierarchy::VT_NAME);
    return o;
  }
};

inline flatbuffers::Offset<ObjectsHierarchy> CreateObjectsHierarchy(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> name = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>>> children = 0) {
  ObjectsHierarchyBuilder builder_(_fbb);
  builder_.add_children(children);
  builder_.add_name(name);
  return builder_.Finish();
}

flatbuffers::Offset<ObjectsHierarchy> CreateObjectsHierarchy(flatbuffers::FlatBufferBuilder &_fbb, const ObjectsHierarchyT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

inline ObjectHierarchyNodeT *ObjectHierarchyNode::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<ObjectHierarchyNodeT>(new ObjectHierarchyNodeT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void ObjectHierarchyNode::UnPackTo(ObjectHierarchyNodeT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = name(); if (_e) _o->name = _e->str(); }
  { auto _e = path(); if (_e) _o->path = _e->str(); }
  { auto _e = children(); if (_e) { _o->children.resize(_e->size()); for (flatbuffers::uoffset_t _i = 0; _i < _e->size(); _i++) { _o->children[_i] = *std::unique_ptr<Gamium::Protocol::Types::ObjectHierarchyNodeT>(_e->Get(_i)->UnPack(_resolver)); } } else { _o->children.resize(0); } }
}

inline flatbuffers::Offset<ObjectHierarchyNode> ObjectHierarchyNode::Pack(flatbuffers::FlatBufferBuilder &_fbb, const ObjectHierarchyNodeT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateObjectHierarchyNode(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<ObjectHierarchyNode> CreateObjectHierarchyNode(flatbuffers::FlatBufferBuilder &_fbb, const ObjectHierarchyNodeT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const ObjectHierarchyNodeT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _name = _fbb.CreateString(_o->name);
  auto _path = _fbb.CreateString(_o->path);
  auto _children = _fbb.CreateVector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>> (_o->children.size(), [](size_t i, _VectorArgs *__va) { return CreateObjectHierarchyNode(*__va->__fbb, &(__va->__o->children[i]), __va->__rehasher); }, &_va );
  return Gamium::Protocol::Types::CreateObjectHierarchyNode(
      _fbb,
      _name,
      _path,
      _children);
}

inline ObjectsHierarchyT *ObjectsHierarchy::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<ObjectsHierarchyT>(new ObjectsHierarchyT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void ObjectsHierarchy::UnPackTo(ObjectsHierarchyT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = name(); if (_e) _o->name = _e->str(); }
  { auto _e = children(); if (_e) { _o->children.resize(_e->size()); for (flatbuffers::uoffset_t _i = 0; _i < _e->size(); _i++) { _o->children[_i] = *std::unique_ptr<Gamium::Protocol::Types::ObjectHierarchyNodeT>(_e->Get(_i)->UnPack(_resolver)); } } else { _o->children.resize(0); } }
}

inline flatbuffers::Offset<ObjectsHierarchy> ObjectsHierarchy::Pack(flatbuffers::FlatBufferBuilder &_fbb, const ObjectsHierarchyT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateObjectsHierarchy(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<ObjectsHierarchy> CreateObjectsHierarchy(flatbuffers::FlatBufferBuilder &_fbb, const ObjectsHierarchyT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const ObjectsHierarchyT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _name = _fbb.CreateString(_o->name);
  auto _children = _fbb.CreateVector<flatbuffers::Offset<Gamium::Protocol::Types::ObjectHierarchyNode>> (_o->children.size(), [](size_t i, _VectorArgs *__va) { return CreateObjectHierarchyNode(*__va->__fbb, &(__va->__o->children[i]), __va->__rehasher); }, &_va );
  return Gamium::Protocol::Types::CreateObjectsHierarchy(
      _fbb,
      _name,
      _children);
}

inline const flatbuffers::TypeTable *ObjectHierarchyNodeTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 1, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Types::ObjectHierarchyNodeTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 3, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ObjectsHierarchyTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 1, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Types::ObjectHierarchyNodeTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 2, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

}  // namespace Types
}  // namespace Protocol
}  // namespace Gamium

#endif  // FLATBUFFERS_GENERATED_OBJECTHIERARCHY_GAMIUM_PROTOCOL_TYPES_H_